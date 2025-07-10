<template>
  <view class="order-food-page">
    <scroll-view class="content-scroll" scroll-y>
      <view class="page-content">
        <text class="page-title">在线点菜</text>

        <!-- 菜品分类导航 -->
        <scroll-view class="category-nav" scroll-x>
          <view class="category-item active">全部</view>
          <view class="category-item">热门推荐</view>
          <view class="category-item">招牌主菜</view>
          <view class="category-item">小吃点心</view>
          <view class="category-item">饮品饮料</view>
          <view class="category-item">甜品蛋糕</view>
        </scroll-view>

        <!-- 菜品列表 -->
        <view class="dish-list">
          <view class="dish-item" v-for="(dish, index) in menuItems" :key="index">
            <image class="dish-img" :src="dish.image" mode="aspectFill"></image>
            <view class="dish-info">
              <text class="dish-name">{{ dish.name }}</text>
              <text class="dish-desc">{{ dish.desc }}</text>
              <view class="dish-footer">
                <text class="dish-price">¥{{ dish.price.toFixed(2) }}</text>
                <view class="add-btn" @click="addToCart(dish)">+</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        menuItems: [
          { name: '香煎三文鱼', desc: '鲜嫩多汁，外酥里嫩', price: 68, image: '/static/images/dish1.jpg' },
          { name: '意大利面', desc: '经典番茄肉酱口味', price: 42, image: '/static/images/dish2.jpg' },
          { name: '法式牛排', desc: '七分熟，配黑胡椒酱汁', price: 128, image: '/static/images/dish3.jpg' },
          { name: '水果沙拉', desc: '新鲜时令水果拼盘', price: 32, image: '/static/images/dish4.jpg' },
          { name: '提拉米苏', desc: '经典意式甜点', price: 28, image: '/static/images/dish5.jpg' },
          { name: '柠檬气泡水', desc: '清爽解渴，夏日特饮', price: 18, image: '/static/images/dish6.jpg' }
        ]
      };
    },
    methods: {
      addToCart(dish) {
        // 加入购物车逻辑
        uni.showToast({ title: '已加入购物车', icon: 'success' });
      }
    },
    methods: {
      // 页面方法
    }
  }
</script>

<style scoped>
  .order-food-page {
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: var(--status-bar-height);
  }
  .content-scroll {
    height: 100%;
  }
  .page-content {
    padding: 20rpx;
  }
  .page-title {
    font-size: 20px;
    font-weight: bold;
    margin: 20px 0;
    text-align: center;
  }

  .category-nav {
    white-space: nowrap;
    padding: 10px 0;
    margin-bottom: 15px;
  }

  .category-item {
    display: inline-block;
    padding: 8px 15px;
    margin-right: 10px;
    background-color: #f5f5f5;
    border-radius: 20px;
    font-size: 14px;
    color: #666;
  }

  .category-item.active {
    background-color: #ff9500;
    color: white;
    font-weight: bold;
  }

  .dish-list {
    padding-bottom: 20px;
  }

  .dish-item {
    display: flex;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .dish-img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    margin-right: 15px;
  }

  .dish-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .dish-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .dish-desc {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
    flex: 1;
  }

  .dish-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dish-price {
    font-size: 16px;
    font-weight: bold;
    color: #e63946;
  }

  .add-btn {
    width: 30px;
    height: 30px;
    background-color: #ff9500;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
</style>