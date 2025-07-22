<template>
  <view class="tab-pane">
    <!-- 二维码邀请弹窗 -->
    <qr-invite-popup 
      v-if="showQrCodeModal"
      :show="showQrCodeModal"
      :qr-code-url="qrCodeUrl"
      @close="handleModalClose"
      @share="handleShare"
      @save="handleSave"
    ></qr-invite-popup>

    <add-dish-popup
      v-if="showAddDishModal"
      :show="showAddDishModal"
      :categories="menuCategories"
      @close="handleDishPopupClose"
      @add="handleDishAdded"
    ></add-dish-popup>

    <!-- 顶部搜索栏 -->
    <view class="search-bar">
      <uni-icons type="search" size="16" class="search-icon"></uni-icons>
      <input 
        type="text"
        v-model="searchKeyword"
        placeholder="搜索菜品..."
        class="search-input"
        @input="handleSearch"
      >
    </view>

    <view class="main-content">
      <!-- 左侧分类栏 -->
      <view class="category-sidebar">
        <view 
          class="category-item"
          :class="activeCategoryId === 'all' ? 'active' : ''"
          @click="handleCategoryClick('all')"
        >
          全部
        </view>
        <view 
          class="category-item"
          :class="activeCategoryId === item.id ? 'active' : ''"
          v-for="item in menuCategories"
          :key="item.id"
          @click="handleCategoryClick(item.id)"
        >
          {{ item.name }}
        </view>
        <view class="add-category-btn" @click="handleAddCategory">
          <uni-icons type="plus" size="16"></uni-icons> 添加分类
        </view>
      </view>

      <!-- 右侧菜品展示区 -->
      <view class="dish-container">
        <!-- 添加菜品按钮 -->
        <view class="add-dish-btn" @click="showAddDishModal = true">
          <uni-icons type="plus" size="24"></uni-icons>
          <text class="add-btn-text">添加菜品</text>
        </view>

        <!-- 菜品列表 -->
        <view class="dish-grid" v-if="filteredDishes.length > 0">
          <view class="dish-card" v-for="(item, index) in filteredDishes" :key="index">
            <image 
              class="dish-img"
              :src="item.image || '/static/images/default-dish.png'"
              mode="aspectFill"
            ></image>
            <view class="dish-info">
              <text class="dish-name">{{ item.name }}</text>
              <view class="dish-meta">
                <text class="dish-price">¥{{ item.price }}</text>
                <text class="dish-calories">{{ item.calories }} 卡路里</text>
              </view>
              <view class="dish-stats">
                <text class="dish-count">已点 {{ item.orderCount || 0 }} 次</text>
              </view>
              <view class="dish-quantity">
                <button 
                  class="quantity-btn minus-btn"
                  @click="handleMinus(index)"
                  :disabled="item.quantity <= 0"
                >-
                </button>
                <text class="quantity-text">{{ item.quantity || 0 }}</text>
                <button class="quantity-btn plus-btn" @click="handlePlus(index)">+
                </button>
              </view>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view class="empty-state" v-else>
          <uni-icons type="empty" size="48" class="empty-icon"></uni-icons>
          <text class="empty-text">快来添加菜品吧</text>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="bottom-bar">
        <view class="left-buttons">
          <button class="shake-btn" @click="handleShake">
            <uni-icons type="refresh" size="16"></uni-icons> 随机
          </button>
        </view>
        <view class="right-buttons">
          <button class="invite-btn" @click="handleInvite">
            <uni-icons type="people" size="16"></uni-icons> 邀请
          </button>
          <button class="order-btn" @click="handleOrder">
            <uni-icons type="cart" size="16"></uni-icons> 下单
          </button>
        </view>
    </view>
  </view>
</template>

<script>
import { onShow, onHide } from '@dcloudio/uni-app';
import QrInvitePopup from '@/components/QrInvitePopup.vue';
import AddDishPopup from '@/components/AddDishPopup.vue';

/**
 * 点菜Tab组件
 * 展示菜品分类和菜品列表，支持添加到购物车功能
 */
export default {
  data() {
    return {
      showQrCodeModal: false,
      qrCodeUrl: '/static/images/invite-qr.png', // 二维码图片路径
      showAddDishModal: false, // 添加菜品弹窗显示状态
      searchKeyword: '', // 搜索关键词
      activeCategoryId: 'all', // 当前选中分类ID
      menuCategories: [
        { id: '1', name: '主食' },
        { id: '2', name: '菜品' },
        { id: '3', name: '汤品' },
        { id: '4', name: '甜点' }
      ], // 分类列表
      menuItems: [
        // 示例菜品数据
        { id: '1', name: '宫保鸡丁', price: 38, calories: 350, orderCount: 120, image: '/static/images/dish1.jpg', categoryId: '2', quantity: 0 },
        { id: '2', name: '鱼香肉丝', price: 32, calories: 320, orderCount: 98, image: '/static/images/dish2.jpg', categoryId: '2', quantity: 0 },
        { id: '3', name: '米饭', price: 3, calories: 150, orderCount: 230, image: '/static/images/dish3.jpg', categoryId: '1', quantity: 0 }
      ], // 菜品列表
      newDish: {}, // 新菜品数据
      selectedCategory: null // 选中的分类
    };
  },
  components: {
    QrInvitePopup,
    AddDishPopup
  },
  props: {
    menuCategories: {
      type: Array,
      required: true,
      description: '菜品分类数据'
    },
    menuItems: {
      type: Array,
      required: true,
      description: '菜品列表数据'
    }
  },
  computed: {
    /**
     * 根据搜索关键词和选中分类过滤菜品
     */
    filteredDishes() {
      return this.menuItems.filter(item => {
        // 分类过滤
        const categoryMatch = this.activeCategoryId === 'all' || item.categoryId === this.activeCategoryId;
        // 搜索关键词过滤
        const keywordMatch = this.searchKeyword === '' || item.name.toLowerCase().includes(this.searchKeyword.toLowerCase());
        return categoryMatch && keywordMatch;
      });
    }
  },
  watch: {
    showQrCodeModal: {
      handler(newVal) {
        this.toggleScrollLock(newVal);
      },
      immediate: true
    },
    showAddDishModal: {
      handler(newVal) {
        this.toggleScrollLock(newVal);
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 处理分类点击事件
     * @param {string} categoryId - 分类ID，'all'表示全部
     */
    handleCategoryClick(categoryId) {
      this.activeCategoryId = categoryId;
    },

    /**
     * 处理搜索输入
     */
    handleSearch() {
      // 搜索逻辑由computed属性filteredDishes处理
    },

    /**
     * 处理添加分类
     */
    handleAddCategory() {
      uni.showModal({
        title: '添加分类',
        content: '请输入分类名称',
        editable: true,
        placeholderText: '分类名称',
        success: (res) => {
          if (res.confirm && res.content.trim()) {
            const newId = Date.now().toString();
            this.menuCategories.push({
              id: newId,
              name: res.content.trim()
            });
            uni.showToast({
              title: '分类添加成功',
              icon: 'success'
            });
          }
        }
      });
    },

    /**
     * 处理数量减少
     * @param {number} index - 菜品索引
     */
    handleMinus(index) {
      if (this.filteredDishes[index].quantity > 0) {
        this.filteredDishes[index].quantity--;
        this.$emit('update-quantity', this.filteredDishes[index]);
      }
    },

    /**
     * 处理数量增加
     * @param {number} index - 菜品索引
     */
    handlePlus(index) {
      if (!this.filteredDishes[index].quantity) {
        this.$set(this.filteredDishes[index], 'quantity', 0);
      }
      this.filteredDishes[index].quantity++;
      this.$emit('update-quantity', this.filteredDishes[index]);
    },

    /**
     * 处理添加菜品弹窗关闭事件
     */
    handleDishPopupClose() {
      this.showAddDishModal = false;
    },

    /**
     * 处理菜品添加成功事件
     * @param {Object} dish - 新添加的菜品数据
     */
    handleDishAdded(dish) {
      // 添加新菜品到列表
      this.menuItems.push({
        id: Date.now().toString(),
        ...dish,
        orderCount: 0,
        quantity: 0
      });

      // 关闭弹窗
      this.showAddDishModal = false;

      uni.showToast({
        title: '菜品添加成功',
        icon: 'success'
      });
    },

    /**
     * 触发添加到购物车事件
     * @param {Object} item - 要添加的菜品对象
     */
    addToCart(item) {
      this.$emit('add-to-cart', item);
    },

    /**
     * 处理摇一摇按钮点击事件
     */
    handleShake() {
      // 摇一摇功能实现
      uni.showToast({ title: '摇一摇功能待实现', icon: 'none' });
    },

    /**
     * 处理邀请按钮点击事件
     */
    handleInvite() {
      this.showQrCodeModal = true;
    },

    /**
     * 处理分享按钮点击事件
     */
    handleShare() {
      uni.share({
        title: '邀请你一起使用美食菜单',
        path: '/pages/index/index',
        success: () => {
          uni.showToast({ title: '分享成功', icon: 'success' });
        },
        fail: () => {
          uni.showToast({ title: '分享失败', icon: 'none' });
        }
      });
    },

    /**
     * 处理保存按钮点击事件
     */
    handleSave() {
      uni.downloadFile({
        url: this.qrCodeUrl,
        success: (res) => {
          uni.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              uni.showToast({ title: '保存成功', icon: 'success' });
            },
            fail: () => {
              uni.showToast({ title: '保存失败', icon: 'none' });
            }
          });
        }
      });
    },

    /**
     * 关闭邀请弹窗
     */
    handleModalClose() {
      this.showQrCodeModal = false;
    },

    /**
     * 处理下单按钮点击事件
     */
    handleOrder() {
      // 下单功能实现
      this.$emit('go-to-order');
    },

    /**
     * 切换页面滚动锁定状态
     * @param {boolean} isLocked - 是否锁定
     */
    toggleScrollLock(isLocked) {
      if (isLocked) {
        uni.setPageStyle({
          overflow: 'hidden'
        });
      } else if (!this.showQrCodeModal && !this.showAddDishModal) {
        uni.setPageStyle({
          overflow: 'auto'
        });
      }
    }
  }
};
</script>

<style scoped>
/* 点菜页面样式 */
.category-scroll {
  width: 100%;
  white-space: nowrap;
  padding: 10px 0;
}

.category-list {
  display: inline-flex;
  padding: 0 15px 0 10px;
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

.dish-list {
  padding: 15px;
}

.dish-item {
  display: flex;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dish-img {
  width: 100px;
  height: 100px;
}

.dish-info {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.dish-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.dish-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
  flex: 1;
}

.dish-price {
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


/* 底部操作栏样式 */
.bottom-bar {
  position: fixed;
  bottom: 10px;
  left: 5%;
  right: 5%;
  width: auto;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.left-buttons {
  display: flex;
  gap: 12px;
  margin-right: auto;
}

.shake-btn {
  background-color: #ff85a2;
  color: #fff;
  font-weight: Semi Bold;
  border: none;
  border-radius: 20px;
  height: 40px;
  padding: 0 15px;
  font-size: 13px;
  justify-content: left;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.shake-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(255, 107, 139, 0.2);
}

.right-buttons {
  display: flex;
  gap: 12px;
  margin-left: auto;
}

.invite-btn, .order-btn {
  border: none;
  border-radius: 20px;
  height: 40px;
  padding: 0 15px;
  font-size: 13px;
  font-weight: Semi Bold;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.invite-btn {
  background-color: #ff85a2;
  color: #fff;
}

.order-btn {
  background-color: #ff85a2;
  color: #fff;
}

.invite-btn:active, .order-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 调整内容区域底部边距，避免被底部栏遮挡 */
.search-bar {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
}

.search-icon {
  color: #999;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  height: 30px;
  background-color: white;
  border-radius: 15px;
  padding: 0 15px;
  font-size: 14px;
}

.main-content {
  display: flex;
  height: calc(100vh - 44px - 50px);
  overflow: hidden;
}

.category-sidebar {
  width: 20%;
  background-color: #f5f5f5;
  overflow-y: auto;
}

.category-item {
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-left: 3px solid transparent;
}

.category-item.active {
  background-color: white;
  color: #ff85a2;
  border-left-color: #ff85a2;
  font-weight: bold;
}

.add-category-btn {
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.dish-container {
  width: 80%;
  padding: 15px;
  overflow-y: auto;
}

.add-dish-btn {
  width: 100%;
  height: 80px;
  border: 2px dashed #eee;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: #999;
}

.add-btn-text {
  font-size: 14px;
  margin-top: 5px;
}

.dish-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.dish-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dish-img {
  width: 100%;
  height: 120px;
}

.dish-info {
  padding: 12px;
}

.dish-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.dish-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.dish-price {
  color: #ff85a2;
  font-weight: bold;
}

.dish-calories {
  font-size: 12px;
  color: #999;
}

.dish-stats {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}

.dish-quantity {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ff85a2;
  background-color: white;
  color: #ff85a2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.quantity-btn.minus-btn:disabled {
  color: #ccc;
  border-color: #ccc;
}

.quantity-text {
  width: 40px;
  text-align: center;
  font-size: 14px;
}

.empty-state {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  margin-top: -30px;
}

.empty-icon {
  margin-bottom: 15px;
  color: #ccc;
}

.empty-text {
  font-size: 16px;
}

.add-dish-modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px;
  z-index: 1000;
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

.content-area {
  padding-bottom: 60px;
}
</style>