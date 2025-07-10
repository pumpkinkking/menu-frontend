<template>
  <view class="fridge-container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <text class="title">冰箱管理</text>
      <view class="navbar-actions">
        <button class="action-btn scan-btn"></button>
        <button class="action-btn batch-btn">批量管理</button>
      </view>
    </view>

    <!-- 双栏布局容器 -->
    <view class="layout-container">
      <!-- 左侧分类导航 -->
      <scroll-view class="category-nav" scroll-y>
        <view class="category-item active">全部食材</view>
        <view class="category-item">蔬菜</view>
        <view class="category-item">水果</view>
        <view class="category-item">肉类</view>
        <view class="category-item">海鲜</view>
        <view class="category-item">乳制品</view>
        <view class="category-item">调味品</view>
        <view class="category-item">饮料</view>
        <view class="category-item">主食</view>
      </scroll-view>

      <!-- 右侧食材网格 -->
      <view class="ingredients-container">
        <!-- 食材状态标签 -->
        <view class="status-tabs">
          <view class="status-tab active">全部</view>
          <view class="status-tab normal">正常</view>
          <view class="status-tab warning">即将过期</view>
          <view class="status-tab expired">已过期</view>
        </view>

        <!-- 食材网格 -->
        <view class="ingredients-grid">
          <!-- 正常食材 -->
          <view class="ingredient-card normal">
            <image class="ingredient-img" src="/static/ingredients/tomato.png"></image>
            <text class="ingredient-name">西红柿</text>
            <text class="ingredient-date">剩余5天</text>
          </view>

          <view class="ingredient-card normal">
            <image class="ingredient-img" src="/static/ingredients/egg.png"></image>
            <text class="ingredient-name">鸡蛋</text>
            <text class="ingredient-date">剩余7天</text>
          </view>

          <!-- 即将过期食材 -->
          <view class="ingredient-card warning">
            <image class="ingredient-img" src="/static/ingredients/milk.png"></image>
            <text class="ingredient-name">牛奶</text>
            <text class="ingredient-date">剩余2天</text>
          </view>

          <view class="ingredient-card warning">
            <image class="ingredient-img" src="/static/ingredients/beef.png"></image>
            <text class="ingredient-name">牛肉</text>
            <text class="ingredient-date">剩余1天</text>
          </view>

          <!-- 已过期食材 -->
          <view class="ingredient-card expired">
            <image class="ingredient-img" src="/static/ingredients/lettuce.png"></image>
            <text class="ingredient-name">生菜</text>
            <text class="ingredient-date">已过期</text>
          </view>

          <view class="add-ingredient-card" @click="addNewIngredient">
            <text class="add-icon">+</text>
            <text class="add-text">添加食材</text>
          </view>
        </view>

        <!-- 智能推荐区域 -->
        <view class="recommendation-section">
          <text class="section-title">食材推荐</text>
          <view class="recipe-recommendations">
            <view class="recipe-card">
              <image class="recipe-img" src="/static/images/recipe-recom1.jpg" mode="aspectFill"></image>
              <text class="recipe-title">西红柿炒鸡蛋</text>
            </view>
            <view class="recipe-card">
              <image class="recipe-img" src="/static/images/recipe-recom2.jpg" mode="aspectFill"></image>
              <text class="recipe-title">牛肉蔬菜汤</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 页面数据
    };
  },
  methods: {
    addNewIngredient() {
      // 添加新食材逻辑
      uni.navigateTo({
        url: '/pages/fridge/add-ingredient'
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.fridge-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

/* 导航栏样式 */
.navbar {
  height: 44px;
  background-color: #ff6b6b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: white;
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.navbar-actions {
  display: flex;
}

.action-btn {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: white;
  margin-left: 12px;
}

.scan-btn {
  width: 30px;
  background-image: url('/static/icon/scan.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.batch-btn {
  font-size: 14px;
  padding: 0 10px;
  border-radius: 15px;
  background-color: rgba(255,255,255,0.2);
}

/* 双栏布局 */
.layout-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 左侧分类导航 */
.category-nav {
  width: 120px;
  background-color: white;
  border-right: 1px solid #eee;
}

.category-item {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #666;
  border-left: 3px solid transparent;
}

.category-item.active {
  color: #ff6b6b;
  border-left-color: #ff6b6b;
  background-color: #fff0f0;
}

/* 右侧食材区域 */
.ingredients-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 状态标签 */
.status-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.status-tab {
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  flex-shrink: 0;
}

.status-tab.active {
  background-color: #ff6b6b;
  color: white;
}

.status-tab.normal {
  background-color: #e6f7ee;
  color: #00b42a;
}

.status-tab.warning {
  background-color: #fff7e6;
  color: #ff7d00;
}

.status-tab.expired {
  background-color: #ffebeb;
  color: #f53f3f;
}

/* 食材网格 */
.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.ingredient-card {
  background-color: white;
  border-radius: 12px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.ingredient-card.normal::before {
  content: '';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00b42a;
}

.ingredient-card.warning::before {
  content: '';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff7d00;
}

.ingredient-card.expired::before {
  content: '';
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f53f3f;
}

.ingredient-img {
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
}

.ingredient-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.ingredient-date {
  font-size: 12px;
  color: #999;
}

.add-ingredient-card {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 30px;
  color: #ccc;
  margin-bottom: 8px;
}

.add-text {
  font-size: 14px;
  color: #999;
}

/* 智能推荐区域 */
.recommendation-section {
  margin-top: 24px;
}

.section-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}

.recipe-recommendations {
  display: flex;
  gap: 12px;
}

.recipe-card {
  width: 50%;
  border-radius: 12px;
  overflow: hidden;
  background-color: white;
}

.recipe-img {
  width: 100%;
  height: 100px;
}

.recipe-title {
  font-size: 14px;
  color: #333;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>