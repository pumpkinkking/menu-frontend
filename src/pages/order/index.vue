<template>
  <view class="order-page">
    <scroll-view class="content-scroll" scroll-y>
      <view class="page-content">
        <text class="page-title">我的订单</text>

        <!-- 订单筛选 -->
        <view class="order-filter">
          <view class="filter-item active">全部订单</view>
          <view class="filter-item">待付款</view>
          <view class="filter-item">配送中</view>
          <view class="filter-item">已完成</view>
        </view>

        <!-- 订单列表 -->
        <view class="order-list">
          <view class="order-item" v-for="(order, index) in orders" :key="index">
            <view class="order-header">
              <text class="order-number">订单号: {{ order.orderNo }}</text>
              <text class="order-date">{{ order.date }}</text>
              <text class="order-status" :class="order.statusClass">{{ order.status }}</text>
            </view>
            <view class="order-details">
              <view class="dish-item" v-for="(dish, dIndex) in order.dishes" :key="dIndex">
                <text class="dish-name">{{ dish.name }} x{{ dish.quantity }}</text>
                <text class="dish-price">¥{{ dish.price.toFixed(2) }}</text>
              </view>
            </view>
            <view class="order-footer">
              <text class="total-price">总计: ¥{{ order.total.toFixed(2) }}</text>
              <view class="action-btn" v-if="order.status === '待付款'" @click="payOrder(order)">去支付</view>
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
        orders: [
          {
            orderNo: 'ORD20230615001',
            date: '2023-06-15 18:30',
            status: '待付款',
            statusClass: 'pending',
            dishes: [
              { name: '香煎三文鱼', quantity: 1, price: 68 },
              { name: '柠檬气泡水', quantity: 1, price: 18 }
            ],
            total: 86
          },
          {
            orderNo: 'ORD20230614002',
            date: '2023-06-14 12:15',
            status: '配送中',
            statusClass: 'delivering',
            dishes: [
              { name: '法式牛排', quantity: 1, price: 128 },
              { name: '意大利面', quantity: 1, price: 42 },
              { name: '提拉米苏', quantity: 1, price: 28 }
            ],
            total: 198
          },
          {
            orderNo: 'ORD20230612001',
            date: '2023-06-12 20:45',
            status: '已完成',
            statusClass: 'completed',
            dishes: [
              { name: '水果沙拉', quantity: 1, price: 32 },
              { name: '意大利面', quantity: 1, price: 42 }
            ],
            total: 74
          }
        ]
      };
    },
    methods: {
      payOrder(order) {
        // 支付订单逻辑
        uni.navigateTo({ url: '/pages/payment/index?orderNo=' + order.orderNo });
      }
    },
    methods: {
      // 页面方法
    }
  }
</script>

<style scoped>
  .order-page {
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

  .order-filter {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    background-color: white;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .filter-item {
    padding: 8px 12px;
    font-size: 14px;
    color: #666;
  }

  .filter-item.active {
    color: #ff9500;
    font-weight: bold;
    border-bottom: 2px solid #ff9500;
  }

  .order-list {
    padding-bottom: 20px;
  }

  .order-item {
    background-color: white;
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f5f5f5;
  }

  .order-number {
    font-size: 14px;
    color: #333;
  }

  .order-date {
    font-size: 14px;
    color: #999;
  }

  .order-status {
    padding: 3px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: bold;
  }

  .pending {
    background-color: #ffebee;
    color: #e63946;
  }

  .delivering {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  .completed {
    background-color: #e8f5e9;
    color: #388e3c;
  }

  .order-details {
    margin-bottom: 15px;
  }

  .dish-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    font-size: 14px;
  }

  .dish-name {
    color: #333;
  }

  .dish-price {
    color: #666;
  }

  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px dashed #f5f5f5;
  }

  .total-price {
    font-size: 16px;
    font-weight: bold;
    color: #e63946;
  }

  .action-btn {
    padding: 8px 15px;
    background-color: #ff9500;
    color: white;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
  }
</style>