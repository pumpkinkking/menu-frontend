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
        <Fridge v-if="currentTab === 0" :ingredients="ingredients" @add-ingredient="handleAddIngredient" />

        <!-- 点菜Tab -->
        <Menu v-if="currentTab === 1" :menu-categories="menuCategories" :menu-items="menuItems" @category-click="handleCategoryClick" @add-to-cart="addToCart" />

        <!-- 订单Tab -->
        <Order v-if="currentTab === 2" :order-filters="orderFilters" :orders="orders" @filter-click="handleFilterClick" @pay-order="payOrder" />

        <!-- 商店Tab -->
        <Shop v-if="currentTab === 3" :product-categories="productCategories" :products="products" @category-click="handleCategoryClick" @add-to-cart="addToCart" @add-reward="handleAddReward" />

        <!-- 菜谱广场Tab -->
        <RecipeSquare v-if="currentTab === 4" :recipe-categories="recipeCategories" :recipes="recipes" @category-click="handleCategoryClick" />

        <!-- 菜篮子Tab -->
        <Basket v-if="currentTab === 5" :menu-items="menuItems" :basket-items="basketItems" />

      </view>
    </view>

  </view>
</template>

<script>
import orderApi from '@/api/order';
import * as menuApi from '@/api/menu';
import ingredientApi from '@/api/ingredient';
import { tabs, orderFilters } from '@/mock/data';
import Fridge from './subpages/Fridge.vue';
import Menu from './subpages/Menu.vue';
import Order from './subpages/Order.vue';
import Shop from './subpages/Shop.vue';
import RecipeSquare from './subpages/RecipeSquare.vue';
import Basket from './subpages/Basket.vue';
export default {
  components: {
    Fridge,
    Menu,
    Order,
    Shop,
    RecipeSquare,
    Basket
  },
  data() {
    return {
      currentTab: 0, // 当前选中的Tab索引，默认厨房
      recipeCategories: [],
      menuCategories: [],
      productCategories: [],
      orderFilters,
      recipes: [],
      ingredients: [],
      menuItems: [],
      orders: [],
      products: [],
      statsData: [],
      tabs,
      basketItems: []
    };
  },
  mounted() {
    // 页面加载时获取订单、食材和菜谱数据
    this.loadOrders();
    this.loadIngredients();
    this.loadRecipes();
  },
  methods: {
      /**
       * 从API加载订单数据
       */
      loadOrders() {
      orderApi.getOrders()
        .then(response => {
          this.orders = response.data;
        })
        .catch(error => {
          uni.showToast({ title: '订单数据加载失败', icon: 'error' });
          console.error('Failed to load orders:', error);
        });
    },
    /**
     * 从API加载食材数据
     */
    loadIngredients() {
      ingredientApi.getIngredients()
        .then(response => {
          this.ingredients = response.data;
        })
        .catch(error => {
          uni.showToast({ title: '食材数据加载失败', icon: 'error' });
          console.error('Failed to load ingredients:', error);
        });
    },
    /**
     * 从API加载菜谱数据
     */
    loadRecipes() {
      menuApi.searchMenus()
        .then(response => {
          this.recipes = response.data;
        })
        .catch(error => {
          uni.showToast({ title: '菜谱数据加载失败', icon: 'error' });
          console.error('Failed to load recipes:', error);
        });
    },
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
      },
    addToCart(item) {
      // 添加到购物车逻辑
      uni.showToast({ title: '已添加到购物车', icon: 'success', duration: 1500 });
    },
    payOrder(orderId) {
      // 支付订单逻辑
      uni.showToast({ title: '支付功能待实现', icon: 'none', duration: 1500 });
    },
    /**
     * 处理添加新食材
     * @param {Object} newIngredient - 新食材对象
     */
    handleAddIngredient(newIngredient) {
      this.ingredients.push(newIngredient);
    },
    /**
     * 处理添加自定义奖励
     * @param {Object} reward - 新添加的奖励对象
     */
    handleAddReward(reward) {
      // 将新奖励添加到商品列表
      this.products.push({
        ...reward,
        image: '/static/images/reward-default.png', // 默认奖励图片
        spec: reward.description || '自定义奖励',
        price: reward.points,
        categoryId: 'custom'
      });
      uni.showToast({ title: '奖励已添加到商店', icon: 'success' });
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
  height: 12vh;
  background: linear-gradient(135deg, #ffccd5 0%, #ffe6e6 100%);
  padding: 30px 16px 16px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: white;
  margin: 0 16px;
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
