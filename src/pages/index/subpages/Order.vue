<template>
  <view class="tab-pane">
    <view class="content-area">
      <!-- 订单页面内容 -->
      <view class="order-filters">
        <view class="filter-item" :class="item.active ? 'active' : ''" v-for="item in orderFilters" :key="item.id" @click="handleFilterClick(item)">
          {{ item.name }}
        </view>
      </view>

      <view class="order-list">
        <view class="order-item" v-for="order in orders" :key="order.id">
          <view class="order-header">
            <text class="order-number">订单号: {{ order.orderNo }}</text>
            <text class="order-date">{{ order.date }}</text>
          </view>
          <view class="order-status">
            <text :class="order.status === '待付款' ? 'status-pending' : order.status === '配送中' ? 'status-delivering' : 'status-completed'">{{ order.status }}</text>
          </view>
          <view class="order-details">
            <view class="dish-info" v-for="dish in order.dishes" :key="dish.id">
              <text class="dish-name">{{ dish.name }} x{{ dish.quantity }}</text>
            </view>
          </view>
          <view class="order-total">
            <text class="total-text">总计: ¥{{ order.totalPrice }}</text>
            <view class="pay-btn" v-if="order.status === '待付款'" @click="payOrder(order.id)">
              <text class="btn-text">去支付</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * 订单Tab组件
 * 展示订单筛选和订单列表，支持订单支付功能
 */
export default {
  props: {
    orderFilters: {
      type: Array,
      required: true,
      description: '订单筛选器数据'
    },
    orders: {
      type: Array,
      required: true,
      description: '订单列表数据'
    }
  },
  methods: {
    /**
     * 处理筛选器点击事件
     * @param {Object} filter - 点击的筛选器对象
     */
    handleFilterClick(filter) {
      this.$emit('filter-click', filter);
    },
    /**
     * 触发订单支付事件
     * @param {number} orderId - 要支付的订单ID
     */
    payOrder(orderId) {
      this.$emit('pay-order', orderId);
    }
  }
};
</script>

<style scoped>
/* 订单页面样式 */
.order-filters {
  display: flex;
  padding: 15px;
  overflow-x: auto;
  gap: 10px;
}

.filter-item {
  padding: 6px 15px;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.filter-item.active {
  background-color: #ff85a2;
  color: white;
}

.order-list {
  padding: 0 15px 15px;
}

.order-item {
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
}

.order-number {
  color: #333;
}

.order-date {
  color: #999;
}

.order-status {
  margin-bottom: 10px;
}

.status-pending {
  color: #ff85a2;
}

.status-delivering {
  color: #ffaa00;
}

.status-completed {
  color: #00b42a;
}

.order-details {
  margin-bottom: 10px;
  padding: 10px 0;
  border-top: 1px dashed #f5f5f5;
  border-bottom: 1px dashed #f5f5f5;
}

.dish-info {
  margin-bottom: 5px;
  font-size: 14px;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.total-text {
  color: #333;
}

.pay-btn {
  padding: 5px 15px;
  background-color: #ff85a2;
  border-radius: 20px;
}

.btn-text {
  color: white;
  font-size: 14px;
}
</style>