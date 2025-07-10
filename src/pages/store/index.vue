<template>
  <view class="store-page">
    <scroll-view class="content-scroll" scroll-y>
      <view class="page-content">
        <text class="page-title">食材商店</text>

        <!-- 商品分类 -->
        <scroll-view class="category-nav" scroll-x>
          <view class="category-item active">全部食材</view>
          <view class="category-item">肉类</view>
          <view class="category-item">海鲜</view>
          <view class="category-item">蔬菜</view>
          <view class="category-item">水果</view>
          <view class="category-item">调味品</view>
        </scroll-view>

        <!-- 商品列表 -->
        <view class="product-list">
          <view class="product-item" v-for="(product, index) in products" :key="index">
            <image class="product-img" :src="product.image" mode="aspectFill"></image>
            <view class="product-info">
              <text class="product-name">{{ product.name }}</text>
              <text class="product-spec">{{ product.spec }}</text>
              <view class="product-footer">
                <text class="product-price">¥{{ product.price.toFixed(2) }}</text>
                <view class="add-btn" @click="addToCart(product)">加入购物车</view>
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
        products: [
          { name: '新鲜三文鱼', spec: '250g/份', price: 58, image: '/static/images/product1.jpg' },
          { name: '特级橄榄油', spec: '500ml/瓶', price: 88, image: '/static/images/product2.jpg' },
          { name: '有机蔬菜拼盘', spec: '400g/份', price: 32, image: '/static/images/product3.jpg' },
          { name: '进口牛排', spec: '300g/块', price: 128, image: '/static/images/product4.jpg' },
          { name: '新鲜柠檬', spec: '500g/份', price: 15, image: '/static/images/product5.jpg' },
          { name: '黑胡椒粒', spec: '50g/瓶', price: 22, image: '/static/images/product6.jpg' }
        ]
      };
    },
    methods: {
      addToCart(product) {
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
  .store-page {
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
    background-color: #4cd964;
    color: white;
    font-weight: bold;
  }

  .product-list {
    padding-bottom: 20px;
  }

  .product-item {
    display: flex;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .product-img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    margin-right: 15px;
  }

  .product-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .product-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .product-spec {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
    flex: 1;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price {
    font-size: 16px;
    font-weight: bold;
    color: #e63946;
  }

  .add-btn {
    padding: 8px 15px;
    background-color: #4cd964;
    color: white;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
  }
</style>