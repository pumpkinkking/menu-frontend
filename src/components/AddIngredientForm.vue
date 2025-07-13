<template>
  <view class="ingredient-popup" v-if="visible">
    <view class="popup-mask" @click="close"></view>
    <view class="ingredient-form" :class="{ 'visible': visible }"><!-- 添加动态类绑定 -->

    
    <!-- 图片上传区域 -->
    <view class="upload-section">
        <view class="upload-area" @click="chooseImage">
          <template v-if="formData.imageUrl">
            <image class="uploaded-image" :src="formData.imageUrl" mode="aspectFill"></image>
            <view class="delete-btn" @click.stop="deleteImage">×</view>
          </template>
          <template v-else>
            <view class="upload-placeholder">
              <image src="/static/icon/upload.png" mode="aspectFit" style="width: 40rpx; height: 40rpx;"></image>
            </view>
          </template>
        </view>
      </view>

    <!-- 表单内容 -->
    <form class="form-content">
      <!-- 食材名称 -->
      <view class="form-item">
        <text class="form-label">食材名称 *</text>
        <input type="text" v-model="formData.name" placeholder="请输入食材名称" class="form-input"/>
      </view>

      <!-- 食材类别 -->
        <view class="form-item">
        <text class="form-label">食材类别 *</text>
        <picker v-model="formData.category" :range="categories" class="form-picker">
          <view class="picker-display">{{ formData.category || '请选择食材类别' }}</view>
        </picker>
      </view>

      <!-- 生产日期 -->
        <view class="form-item">
        <text class="form-label">生产日期 *</text>
        <picker mode="date" v-model="formData.productionDate" start="1970-01-01" end="2100-12-31" class="form-picker">
          <view class="picker-display">{{ formData.productionDate || '请选择生产日期' }}</view>
        </picker>
      </view>

      <!-- 保质期 -->
        <view class="form-item">
        <text class="form-label">保质期(天) *</text>
        <input type="number" v-model.number="formData.shelfLife" placeholder="请输入保质期天数" class="form-input"/>
      </view>

      <!-- 数量 -->
        <view class="form-item">
        <text class="form-label">数量 *</text>
        <input type="number" v-model.number="formData.quantity" placeholder="请输入数量" class="form-input"/>
      </view>

      <!-- 单位 -->
        <view class="form-item">
        <text class="form-label">单位 *</text>
        <picker v-model="formData.unit" :range="units" class="form-picker">
          <view class="picker-display">{{ formData.unit || '请选择单位' }}</view>
        </picker>
      </view>

      <!-- 存储位置 -->
        <view class="form-item">
        <text class="form-label">存储位置 *</text>
        <picker v-model="formData.location" :range="locations" class="form-picker">
          <view class="picker-display">{{ formData.location || '请选择存储位置' }}</view>
        </picker>
      </view>

      <!-- 新鲜度 -->
        <view class="form-item">
        <text class="form-label">新鲜度 *</text>
        <picker v-model="formData.freshness" :range="freshnessLevels" class="form-picker">
          <view class="picker-display">{{ formData.freshness || '请选择新鲜度' }}</view>
        </picker>
      </view>

      <!-- 备注 -->
        <view class="form-item">
        <text class="form-label">备注</text>
        <textarea v-model="formData.notes" placeholder="请输入备注信息" class="form-textarea"></textarea>
      </view>
    </form>

    <!-- 提交按钮 -->
    <button class="submit-btn" @click="submitForm">保存食材</button>
  </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'submit'],

  data() {
      return {
        imageList: [],
        // 表单数据
        formData: {
        name: '',
        category: '',
        productionDate: '',
        shelfLife: null,
        quantity: null,
        unit: '',
        location: '',
        freshness: '',
        notes: '',
        imageUrl: ''
      },
      // 选择器数据
      categories: ['蔬菜', '水果', '肉类', '海鲜', '蛋奶', '谷物', '调味品', '饮料', '其他'],
      units: ['个', '份', '克', '千克', '毫升', '升', '包', '袋'],
      locations: ['冷藏室', '冷冻室', '常温', '橱柜'],
      freshnessLevels: ['非常新鲜', '新鲜', '一般', '较差']
    };
  },
  methods: {
    // 选择图片
    chooseImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          // 临时文件路径
          const tempFilePaths = res.tempFilePaths;
          this.formData.imageUrl = tempFilePaths[0];
        }
      });
    },
    // 删除图片
    deleteImage() {
        this.formData.imageUrl = '';
      },
      close() {
        this.$emit('close');
      },
    // 表单验证
    validateForm() {
      const { name, category, productionDate, shelfLife, quantity, unit, location, freshness } = this.formData;
      if (!name) {
        wx.showToast({ title: '请输入食材名称', icon: 'none' });
        return false;
      }
      if (!category) {
        wx.showToast({ title: '请选择食材类别', icon: 'none' });
        return false;
      }
      if (!productionDate) {
        wx.showToast({ title: '请选择生产日期', icon: 'none' });
        return false;
      }
      if (shelfLife === null || shelfLife <= 0) {
        wx.showToast({ title: '请输入有效的保质期', icon: 'none' });
        return false;
      }
      if (quantity === null || quantity <= 0) {
        wx.showToast({ title: '请输入有效的数量', icon: 'none' });
        return false;
      }
      if (!unit) {
        wx.showToast({ title: '请选择单位', icon: 'none' });
        return false;
      }
      if (!location) {
        wx.showToast({ title: '请选择存储位置', icon: 'none' });
        return false;
      }
      if (!freshness) {
        wx.showToast({ title: '请选择新鲜度', icon: 'none' });
        return false;
      }
      return true;
    },
    // 计算过期日期
    calculateExpiryDate() {
      const production = new Date(this.formData.productionDate);
      const expiryDate = new Date(production);
      expiryDate.setDate(production.getDate() + this.formData.shelfLife);
      return expiryDate.toISOString().split('T')[0];
    },
    // 提交表单
    submitForm() {
      if (!this.validateForm()) return;

      // 计算过期日期
      const expiryDate = this.calculateExpiryDate();

      // 准备提交的数据
      const newIngredient = {
        ...this.formData,
        expiryDate,
        id: Date.now().toString() // 生成唯一ID
      };

      // 返回数据给上一页
      this.$emit('submit', newIngredient);
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.ingredient-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.ingredient-form {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 750rpx;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  max-height: 50vh;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  box-sizing: border-box;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
}

.ingredient-form.visible {
  transform: translateX(-50%) translateY(0);
}

.upload-section {
  display: flex;
  justify-content: center;
  margin: 20rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}


.delete-btn {
  position: absolute;
  top: 5rpx;
  right: 5rpx;
  width: 30rpx;
  height: 30rpx;
  background-color: rgba(255, 183, 197, 0.9);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  z-index: 10;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
}

.delete-btn:hover {
  transform: scale(1.1);
  background-color: #ff99b3;
}
.upload-area {
  width: 150rpx;
  height: 150rpx;
  background-color: #fff;
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2rpx dashed #ddd;
  position: relative;
}
.uploaded-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8rpx;
}
.upload-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #999;
}

.form-content {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
}
.form-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.form-label {
  width: 120px;
  padding-right: 15px;
  text-align: left;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
}

.form-label {
  display: block;
  font-size: 28rpx;
  margin-bottom: 10rpx;
  color: #333;
}

.picker-display{
  flex: 1;
  height: 70rpx;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  line-height: 70rpx;
  padding: 0 15rpx;
  padding-right: 40rpx;
  position: relative;
  box-sizing: border-box;
}

.form-picker{
  flex: 1;
  height: 70rpx;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  font-size: 28rpx;
  line-height: 70rpx;
}
.form-input, .form-textarea {
  flex: 1;
  height: 70rpx;
  border: 1px solid #ddd;
  border-radius: 8rpx;
  font-size: 28rpx;
  line-height: 70rpx;
  padding: 0 15rpx;
}

.picker-display {
  position: relative;
  padding-right: 30rpx;
}

.picker-display::after {
  content: ">";
  position: absolute;
  right: 15rpx;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24rpx;
  color: #999;
}

.form-textarea {
  height: 150rpx;
  padding: 20rpx;
  line-height: 1.5;
}
.picker-display {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #666;
}
.submit-btn {
  width: 100%;
  height: 90rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
  font-size: 32rpx;
  margin-top: 30rpx;
}
</style>