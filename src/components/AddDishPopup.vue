<template>
  <view class="add-dish-modal" v-if="show">
    <view class="modal-mask" @click="handleCancel"></view>
    <view class="modal-content">
      <text class="modal-title">添加新菜品</text>
      <view class="modal-form">
        <!-- 菜品表单内容 -->
        <view class="form-group">
          <text class="form-label">菜品名称</text>
          <input class="form-input" v-model="dish.name" placeholder="请输入菜品名称">
        </view>
        <view class="form-group">
          <text class="form-label">价格</text>
          <input class="form-input" v-model.number="dish.price" type="number" placeholder="请输入价格">
        </view>
        <view class="form-group">
          <text class="form-label">卡路里</text>
          <input class="form-input" v-model.number="dish.calories" type="number" placeholder="请输入卡路里">
        </view>
        <view class="form-group">
          <text class="form-label">分类</text>
          <picker class="form-picker" @change="handleCategorySelect" :range="categories" :range-key="'name'">
            <view class="picker-text">{{ selectedCategory ? selectedCategory.name : '请选择分类' }}</view>
          </picker>
        </view>
        <view class="form-group">
          <text class="form-label">菜品图片</text>
          <button class="upload-btn" @click="handleImageUpload">上传图片</button>
        </view>
      </view>
      <view class="modal-buttons">
        <button class="cancel-btn" @click="handleCancel">取消</button>
        <button class="confirm-btn" @click="handleConfirm">确认添加</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    categories: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      dish: {
        name: '',
        price: 0,
        calories: 0,
        categoryId: '',
        image: ''
      },
      selectedCategory: null
    };
  },
  methods: {
    /**
     * 处理分类选择事件
     * @param {Object} e - 选择事件对象
     */
    handleCategorySelect(e) {
      const index = e.detail.value;
      this.selectedCategory = this.categories[index];
      this.dish.categoryId = this.selectedCategory.id;
    },
    /**
     * 处理图片上传
     */
    handleImageUpload() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          this.dish.image = res.tempFilePaths[0];
        }
      });
    },
    /**
     * 处理取消按钮点击事件
     */
    handleCancel() {
      this.$emit('close');
    },
    /**
     * 处理确认添加按钮点击事件
     */
    handleConfirm() {
      // 表单验证
      if (!this.dish.name || !this.dish.price || !this.dish.categoryId) {
        uni.showToast({
          title: '请填写必填字段',
          icon: 'none'
        });
        return;
      }

      // 触发添加事件，将菜品数据传递给父组件
      this.$emit('add', this.dish);

      // 重置表单
      this.dish = {
        name: '',
        price: 0,
        calories: 0,
        categoryId: '',
        image: ''
      };
      this.selectedCategory = null;
    }
  }
};
</script>

<style scoped>
.add-dish-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
  text-align: center;
}

.modal-form {
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.form-input {
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0 15px;
  font-size: 14px;
}

.form-picker {
  width: 100%;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0 15px;
  display: flex;
  align-items: center;
}

.upload-btn {
  width: 100%;
  height: 40px;
  border: 1px dashed #eee;
  border-radius: 8px;
  background-color: #f5f5f5;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-buttons {
  display: flex;
  gap: 15px;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  height: 45px;
  border-radius: 8px;
  font-size: 16px;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: none;
}

.confirm-btn {
  background-color: #ff85a2;
  color: white;
  border: none;
}
</style>