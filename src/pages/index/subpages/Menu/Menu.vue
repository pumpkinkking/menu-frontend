<template>
  <view class="tab-pane">
    <!-- 二维码邀请弹窗 -->
    <view class="qr-modal" v-if="showQrCodeModal">
      <view class="qr-card">
        <image class="qr-code" :src="qrCodeUrl" mode="widthFix"></image>
        <text class="qr-desc">扫码邀请好友一起点餐</text>
        <view class="qr-buttons">
          <button class="qr-btn share-btn" @click="handleShare">分享</button>
          <button class="qr-btn save-btn" @click="handleSave">保存</button>
        </view>
      </view>
    </view>
    
    <view class="content-area">
      <!-- 点菜页面内容 -->
      <scroll-view class="category-scroll" scroll-x>
        <view class="category-list">
          <view class="category-item" :class="item.active ? 'active' : ''" v-for="item in menuCategories" :key="item.id" @click="handleCategoryClick(item)">
            {{ item.name }}
          </view>
        </view>
      </scroll-view>

      <view class="dish-list">
        <view class="dish-item" v-for="item in menuItems" :key="item.id">
          <image class="dish-img" :src="item.image" mode="aspectFill"></image>
          <view class="dish-info">
            <text class="dish-title">{{ item.name }}</text>
            <text class="dish-desc">{{ item.desc }}</text>
            <view class="dish-price">
              <text class="price">¥{{ item.price }}</text>
              <view class="add-btn" @click="addToCart(item)">
                <text class="btn-text">+</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <button class="shake-btn" @click="handleShake">
          <uni-icons type="refresh" size="16"></uni-icons> 摇一摇
        </button>
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
/**
 * 点菜Tab组件
 * 展示菜品分类和菜品列表，支持添加到购物车功能
 */
export default {
  data() {
    return {
      showQrCodeModal: false,
      qrCodeUrl: '/static/images/invite-qr.png' // 二维码图片路径
    };
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
     * 处理下单按钮点击事件
     */
    handleOrder() {
      // 下单功能实现
      this.$emit('go-to-order');
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

/* 二维码弹窗样式 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.qr-card {
  width: 280px;
  background-color: white;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-code {
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
}

.qr-desc {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.qr-buttons {
  display: flex;
  gap: 15px;
  width: 100%;
}

.qr-btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  color: white;
}

.share-btn {
  background-color: #ff85a2;
}

.save-btn {
  background-color: #4cd964;
}

/* 底部操作栏样式 */
.bottom-bar {
  position: fixed;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);

}

.shake-btn {
  background: linear-gradient(135deg, #ff6b8b 0%, #ff85a2 100%);
  color: white;
  border: none;
  border-radius: 24px;
  padding: 10px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 3px 8px rgba(255, 107, 139, 0.3);
  transition: all 0.3s ease;
}

.shake-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(255, 107, 139, 0.2);
}

.right-buttons {
  display: flex;
  gap: 12px;
}

.invite-btn, .order-btn {
  border: none;
  border-radius: 24px;
  padding: 10px 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.invite-btn {
  background: linear-gradient(135deg, #4cd964 0%, #5ac8fa 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(76, 217, 100, 0.3);
}

.order-btn {
  background: linear-gradient(135deg, #ff9500 0%, #ffcc00 100%);
  color: white;
  box-shadow: 0 3px 8px rgba(255, 149, 0, 0.3);
}

.invite-btn:active, .order-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 调整内容区域底部边距，避免被底部栏遮挡 */
.content-area {
  padding-bottom: 60px;
}
</style>