<template>
  <view class="home-container">
    <!-- 顶部区域 -->
    <view class="top-area">

      <view class="stats-cards">
        <view class="stat-card" v-for="(stat, index) in statsData" :key="index">
          <text class="stat-value">{{ stat.value }}</text>
          <text class="stat-label">{{ stat.label }}</text>
        </view>
      </view>
    </view>

    <!-- 中部功能区 - Tab导航 -->
    <view class="tab-container">
      <!-- Tab导航栏 -->
      <view class="tab-bar">
        <view class="tab-item" v-for="(tab, index) in tabs" :key="index" @click="handleTabClick(tab)">
          <text class="tab-text">{{ tab.name }}</text>
        </view>
      </view>

      <!-- 菜谱广场内容区域 -->
      <view class="tab-content">
        <!-- 厨房Tab -->
        <view class="tab-pane" v-if="currentTab === 0">
          <view class="content-area">
            <!-- 厨房页面内容 -->
            <view class="cooking-status">
              <text class="section-title">当前烹饪</text>
              <view class="status-card">
                <image class="dish-img" src="/static/images/salmon.jpg" mode="aspectFill"></image>
                <view class="dish-info">
                  <text class="dish-name">香煎三文鱼</text>
                  <view class="cooking-steps">
                    <text class="step-item active">准备食材</text>
                    <text class="step-item">煎制</text>
                    <text class="step-item">调味</text>
                  </view>
                  <view class="progress-container">
                    <progress percent="33" stroke-width="4" activeColor="#ff85a2" backgroundColor="#f0f0f0"></progress>
                  </view>
                </view>
              </view>
            </view>

            <view class="ingredients-list">
              <text class="section-title">食材库存</text>
              <view class="ingredient-item" v-for="ingredient in ingredients" :key="ingredient.id">
                <text class="ingredient-name">{{ ingredient.name }}</text>
                <view class="ingredient-quantity">
                  <text :class="ingredient.quantity <= 5 ? 'low-quantity' : ''">{{ ingredient.quantity }} {{
                    ingredient.unit }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 点菜Tab -->
        <view class="tab-pane" v-if="currentTab === 1">
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
        </view>

        <!-- 订单Tab -->
        <view class="tab-pane" v-if="currentTab === 2">
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
                  <text
                    :class="order.status === '待付款' ? 'status-pending' : order.status === '配送中' ? 'status-delivering' : 'status-completed'">{{
                    order.status }}</text>
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

        <!-- 商店Tab -->
        <view class="tab-pane" v-if="currentTab === 3">
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
        </view>

        <!-- 菜谱广场Tab -->
        <view class="tab-pane" v-if="currentTab === 4">
          <!-- 内容流区域 -->
          <view class="content-area">
            <scroll-view class="category-scroll" scroll-x>
              <view class="category-list">
                <view class="category-item" :class="item.active ? 'active' : ''" v-for="item in recipeCategories" :key="item.id" @click="handleCategoryClick(item)">
                  {{ item.name }}
                </view>
              </view>
            </scroll-view>

            <view class="recipe-list">
              <view class="recipe-card" v-for="recipe in recipes" :key="recipe.id">
                <image class="recipe-img" :src="recipe.image" mode="aspectFill"></image>
                <view class="recipe-info">
                  <text class="recipe-title">{{ recipe.title }}</text>
                  <view class="recipe-meta">
                    <text class="meta-item">{{ recipe.time }}</text>
                    <text class="meta-item">{{ recipe.category }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 悬浮协作按钮 -->
    <view class="floating-btn" @click="startCollaboration">
      <text class="btn-text">+</text>
    </view>
  </view>
</template>

<script>
import { recipeCategories, menuCategories, productCategories, orderFilters, recipes, ingredients, menuItems, orders, products, statsData, tabs } from '@/mock/data';
export default {
  data() {
    return {
      currentTab: 0, // 当前选中的Tab索引，默认厨房
      recipeCategories,
      menuCategories,
      productCategories,
      orderFilters,
      recipes,
      ingredients,
      menuItems,
      orders,
      products,
      statsData,
      tabs
    };
  },
  methods: {
      // 处理分类点击事件
      handleCategoryClick(category) {
        // 重置同类型所有分类的active状态
        const categories = this[Object.keys(this).find(key => this[key].includes(category))];
        categories.forEach(item => item.active = false);
        category.active = true;
      },
      handleFilterClick(filter) {
        // 重置所有筛选器的active状态
        this.orderFilters.forEach(item => item.active = false);
        filter.active = true;
      },
      switchTab(index) {
        this.currentTab = index;
      }
    addToCart(item) {
      // 添加到购物车逻辑
      uni.showToast({ title: '已添加到购物车', icon: 'success', duration: 1500 });
    },
    payOrder(orderId) {
      // 支付订单逻辑
      uni.showToast({ title: '支付功能待实现', icon: 'none', duration: 1500 });
    },
    handleTabClick(tab) {
      if (tab.type === 'navigate') {
        this.navigateTo(tab.path);
      } else if (tab.type === 'switch') {
        this.switchTab(tab.index);
      }
    },
    navigateTo(url) {
      uni.navigateTo({ url });
    },
    startCollaboration() {
      // 跳转到协作中心
      uni.switchTab({
        url: '/pages/collaboration/collaboration'
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.home-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* Tab容器样式 */
.tab-container {
  margin: 16px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

/* Tab导航栏 */
.tab-bar {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  position: relative;
  min-width: 0;
}

.tab-text {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-item.active .tab-text {
  color: #ff85a2;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background-color: #ff85a2;
  border-radius: 3px;
}

/* Tab内容区域 */
.tab-content {
  min-height: 300px;
}

.tab-pane {
  padding: 20px;
}

/* 空状态样式 */
.tab-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-tip {
  color: #999;
  font-size: 14px;
}

/* 菜谱广场样式 */
.recipe-scroll {
  height: 400px;
}

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.recipe-card {
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 16px;
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.recipe-img {
  width: 100%;
  height: 120px;
}

.recipe-name {
  padding: 10px;
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 顶部区域 */
.top-area {
  height: 25vh;
  background: linear-gradient(135deg, #ffccd5 0%, #ffe6e6 100%);
  padding: 30px 16px 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: white;
}

/* 增加stats-cards与顶部距离 */
.stats-cards {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.welcome-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 20px;
  font-weight: bold;
}

.avatar-container {
  display: flex;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
}

.avatar.couple {
  margin-left: -10px;
}

.stats-cards {
  display: flex;
  justify-content: space-between;
}

.stat-card {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 12px;
  width: 32%;
  text-align: center;
}

.stat-value {
  font-size: 22px;
  font-weight: bold;
  display: block;
}

.stat-label {
  font-size: 12px;
  opacity: 0.9;
}

/* 中部功能区 */
.functions-area {
  padding: 16px;
  margin-top: -10px;
}

.function-grid {
  background-color: white;
  border-radius: 16px;
  padding: 20px 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.function-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 8px;
}

.function-name {
  font-size: 14px;
  color: #333;
}

.online-status {
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding-left: 10px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4ecdc4;
  margin-right: 6px;
}

.status-text {
  font-size: 14px;
  color: #666;
}

/* 内容流区域 */
.content-area {
  padding: 0 16px 16px;
}

.category-scroll {
  height: 40px;
  margin-bottom: 12px;
}

.category-list {
  display: flex;
  gap: 12px;
}

.category-item {
  padding: 6px 16px;
  background-color: white;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
}

.category-item.active {
  background-color: #ff6b6b;
  color: white;
}

.recipe-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recipe-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
}

.recipe-img {
  width: 100%;
  height: 180px;
}

.recipe-info {
  padding: 12px;
}

.recipe-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
}

.recipe-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #999;
}

/* 悬浮按钮 */
.floating-btn {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ff6b6b;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.4);
}

/* 订单样式优化 */
.order-item {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;
}

.order-item:hover {
  background-color: #f9f9f9;
  border-radius: 8px;
}

.filter-item.active {
  background-color: #ff85a2;
  color: white;
}
</style>
