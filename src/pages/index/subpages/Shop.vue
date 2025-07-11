<template>
  <view class="tab-pane">
    <view class="content-area">
      <!-- 商店页面内容 -->
      <scroll-view class="category-scroll" scroll-x>
        <view class="category-list">
          <view class="category-item" :class="item.active ? 'active' : ''" v-for="item in productCategories" :key="item.id" @click="handleCategoryClick(item)">
            {{ item.name }}
          </view>
        </view>
      </scroll-view>

      <view class="product-list">
        <view class="product-item" v-for="product in products" :key="product.id">
          <image class="product-img" :src="product.image" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-title">{{ product.name }}</text>
            <text class="product-spec">{{ product.spec }}</text>
            <view class="product-price">
              <text class="price">¥{{ product.price }}</text>
              <view class="add-btn" @click="addToCart(product)">
                <text class="btn-text">+</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 悬浮添加按钮 -->
    <button class="floating-add-btn" @click="showAddRewardDialog = true">+
    </button>

    <!-- 添加奖励子页面/模态框 -->
    <view class="reward-modal" v-if="showAddRewardDialog">
      <view class="modal-content">
        <view class="modal-header">
          <text class="modal-title">添加自定义奖励</text>
          <button class="close-btn" @click="showAddRewardDialog = false">×</button>
        </view>
        <view class="modal-body">
          <view class="form-group">
            <text class="label">奖励名称</text>
            <input type="text" v-model="newReward.name" placeholder="输入奖励名称" class="input"/>
          </view>
          <view class="form-group">
            <text class="label">积分数量</text>
            <input type="number" v-model="newReward.points" placeholder="输入所需积分" class="input"/>
          </view>
          <view class="form-group">
            <text class="label">奖励描述</text>
            <textarea v-model="newReward.description" placeholder="输入奖励描述" class="textarea"></textarea>
          </view>
        </view>
        <view class="modal-footer">
          <button class="cancel-btn" @click="showAddRewardDialog = false">取消</button>
          <button class="confirm-btn" @click="addReward">确认添加</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * 商店Tab组件
 * 展示商品分类和商品列表，支持添加到购物车功能
 */
export default {
  data() {
    return {
      showAddRewardDialog: false,
      newReward: {
        name: '',
        points: 0,
        description: ''
      }
    };
  },
  props: {
    productCategories: {
      type: Array,
      required: true,
      description: '商品分类数据'
    },
    products: {
      type: Array,
      required: true,
      description: '商品列表数据'
    }
  },
  methods: {
    /**
     * 处理分类点击事件
     * @param {Object} category - 点击的分类对象
     */
    handleCategoryClick(category) {
      this.$emit('category-click', category);
    },
    /**
     * 触发添加到购物车事件
     * @param {Object} product - 要添加的商品对象
     */
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
    /**
     * 添加自定义奖励
     * 收集表单数据并触发父组件事件
     */
    addReward() {
      if (!this.newReward.name || !this.newReward.points) {
        uni.showToast({ title: '请填写必填项', icon: 'none' });
        return;
      }
      // 触发父组件添加奖励事件
      this.$emit('add-reward', {
        ...this.newReward,
        id: Date.now() // 生成临时ID
      });
      // 重置表单并关闭模态框
      this.newReward = { name: '', points: 0, description: '' };
      this.showAddRewardDialog = false;
      uni.showToast({ title: '奖励添加成功' });
    }
  }
};
</script>

<style scoped>
/* 商店页面样式 */
.category-scroll {
  width: 100%;
  white-space: nowrap;
  padding: 10px 0;
}

.category-list {
  display: inline-flex;
  padding: 0 15px;
}

.category-item {
  padding: 6px 15px;
  background-color: #f5f5f5;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 14px;
  color: #666;
}

.category-item.active {
  background-color: #ff85a2;
  color: white;
}

.product-list {
  padding: 15px;
}

.product-item {
  display: flex;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-img {
  width: 100px;
  height: 100px;
}

.product-info {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-spec {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  flex: 1;
}

.product-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 16px;
  color: #ff85a2;
  font-weight: bold;
}

.add-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ff85a2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-text {
  color: white;
  font-size: 20px;
  line-height: 20px;
}

/* 悬浮添加按钮 */
.floating-add-btn {
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ff85a2;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

/* 奖励模态框 */
.reward-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
}

.modal-body {
  padding: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #666;
}

.input,
.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.textarea {
  height: 100px;
  resize: none;
}

.modal-footer {
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn,
.confirm-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.confirm-btn {
  background-color: #ff85a2;
  color: white;
}
</style>