<template>
  <view class="container">
    <scroll-view class="content-scroll" scroll-y>
      <view class="page-content">
        <text class="page-title">我的厨房</text>

        <!-- 烹饪状态卡片 -->
        <view class="status-card">
          <text class="status-title">当前烹饪</text>
          <view class="cooking-status">
            <image class="dish-img" src="/static/images/dish1.jpg" mode="aspectFill"></image>
            <view class="status-info">
              <text class="dish-name">香煎三文鱼</text>
              <text class="cooking-step">步骤 3/5: 加入调味料</text>
              <view class="progress-bar">
                <view class="progress" :style="{width: '60%'}"></view>
              </view>
            </view>
          </view>
        </view>

        <!-- 食材库存列表 -->
        <view class="section-title">食材库存</view>
        <view class="ingredients-list">
          <view class="ingredient-item" v-for="(item, index) in ingredients" :key="index">
            <text class="ingredient-name">{{ item.name }}</text>
            <text class="ingredient-quantity">{{ item.quantity }} {{ item.unit }}</text>
            <text class="ingredient-status" :class="item.status">{{ item.statusText }}</text>
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
      ingredients: [
        { name: '三文鱼', quantity: 250, unit: 'g', status: 'normal', statusText: '充足' },
        { name: '橄榄油', quantity: 50, unit: 'ml', status: 'normal', statusText: '充足' },
        { name: '柠檬', quantity: 1, unit: '个', status: 'warning', statusText: '不足' },
        { name: '盐', quantity: 10, unit: 'g', status: 'normal', statusText: '充足' },
        { name: '黑胡椒', quantity: 5, unit: 'g', status: 'normal', statusText: '充足' },
        { name: '迷迭香', quantity: 2, unit: '枝', status: 'warning', statusText: '不足' }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  min-height: 100vh;
  padding-top: 44px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.content-scroll {
  height: 100%;
}

.page-content {
  padding: 15px;
}

.page-title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
}

.status-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.status-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.cooking-status {
  display: flex;
  align-items: center;
}

.dish-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
}

.status-info {
  flex: 1;
}

.dish-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.cooking-step {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.progress-bar {
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  width: 100%;
}

.progress {
  height: 100%;
  background-color: #4cd964;
  border-radius: 4px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0;
  color: #333;
}

.ingredients-list {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.ingredient-item:last-child {
  border-bottom: none;
}

.ingredient-name {
  font-size: 15px;
}

.ingredient-quantity {
  color: #666;
  font-size: 14px;
}

.ingredient-status {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.normal {
  background-color: #eafaef;
  color: #4cd964;
}

.warning {
  background-color: #fff8e6;
  color: #ff9500;
}
</style>