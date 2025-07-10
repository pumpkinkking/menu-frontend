<template>
  <view class="discovery-container">
    <!-- 顶部搜索区 -->
    <view class="search-container">
      <view class="search-box">
        <text class="search-icon"></text>
        <input type="text" placeholder="搜索菜谱或食材..." class="search-input"/>
      </view>
      <button class="filter-btn">筛选</button>
    </view>

    <!-- 分类导航 -->
    <scroll-view class="category-scroll" scroll-x>
      <view class="category-list">
        <view class="category-item active">全部</view>
        <view class="category-item">早餐</view>
        <view class="category-item">午餐</view>
        <view class="category-item">晚餐</view>
        <view class="category-item">甜点</view>
        <view class="category-item">节日专题</view>
        <view class="category-item">快手菜</view>
        <view class="category-item">健康低脂</view>
      </view>
    </scroll-view>

    <!-- 活动轮播 -->
    <view class="banner-container">
      <swiper class="banner-swiper" indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
        <swiper-item>
          <view class="banner-item" style="background-color: #ff6b6b;">
            <text class="banner-text">情侣烹饪挑战</text>
            <text class="banner-subtext">完成3道情侣菜谱赢取浪漫晚餐</text>
          </view>
        </swiper-item>
        <swiper-item>
          <view class="banner-item" style="background-color: #4ecdc4;">
            <text class="banner-text">夏日轻食季</text>
            <text class="banner-subtext">低卡健康菜谱合集</text>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 内容区标题 -->
    <view class="content-header">
      <text class="content-title">热门推荐</text>
      <text class="more-link">更多</text>
    </view>

    <!-- 双列瀑布流内容区 -->
    <view class="waterfall-container">
      <view class="waterfall-column">
        <!-- 菜谱卡片1 -->
        <view class="recipe-card">
          <image class="recipe-img" src="/static/images/recipe1.jpg" mode="aspectFill"></image>
          <view class="recipe-info">
            <text class="recipe-title">香煎牛排配红酒酱汁</text>
            <view class="recipe-meta">
              <text class="meta-item">难度：中等</text>
              <text class="meta-item">30分钟</text>
            </view>
            <view class="recipe-tags">
              <text class="tag">情侣浪漫</text>
              <text class="tag">西餐</text>
            </view>
          </view>
        </view>

        <!-- 菜谱卡片3 -->
        <view class="recipe-card">
          <image class="recipe-img" src="/static/images/recipe3.jpg" mode="aspectFill"></image>
          <view class="recipe-info">
            <text class="recipe-title">草莓奶油蛋糕</text>
            <view class="recipe-meta">
              <text class="meta-item">难度：高级</text>
              <text class="meta-item">90分钟</text>
            </view>
            <view class="recipe-tags">
              <text class="tag">甜点</text>
              <text class="tag">节日</text>
            </view>
          </view>
        </view>
      </view>

      <view class="waterfall-column">
        <!-- 菜谱卡片2 -->
        <view class="recipe-card">
          <image class="recipe-img" src="/static/images/recipe2.jpg" mode="aspectFill"></image>
          <view class="recipe-info">
            <text class="recipe-title">日式寿喜烧</text>
            <view class="recipe-meta">
              <text class="meta-item">难度：简单</text>
              <text class="meta-item">45分钟</text>
            </view>
            <view class="recipe-tags">
              <text class="tag">火锅</text>
              <text class="tag">双人份</text>
            </view>
          </view>
        </view>

        <!-- 菜谱卡片4 -->
        <view class="recipe-card">
          <image class="recipe-img" src="/static/images/recipe4.jpg" mode="aspectFill"></image>
          <view class="recipe-info">
            <text class="recipe-title">意式番茄肉酱面</text>
            <view class="recipe-meta">
              <text class="meta-item">难度：简单</text>
              <text class="meta-item">25分钟</text>
            </view>
            <view class="recipe-tags">
              <text class="tag">快手菜</text>
              <text class="tag">西餐</text>
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
    // 页面方法
  }
};
</script>

<style scoped>
/* 基础样式 */
.discovery-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 搜索区样式 */
.search-container {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}

.search-box {
  flex: 1;
  height: 36px;
  background-color: #f5f5f5;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 14px;
  margin-left: 8px;
}

.filter-btn {
  width: 60px;
  height: 36px;
  background-color: #ff6b6b;
  color: white;
  border-radius: 18px;
  border: none;
  font-size: 14px;
}

/* 分类导航 */
.category-scroll {
  height: 50px;
  background-color: white;
  border-bottom: 1px solid #eee;
  white-space: nowrap;
}

.category-list {
  display: inline-flex;
  padding: 0 16px;
}

.category-item {
  height: 50px;
  line-height: 50px;
  padding: 0 16px;
  font-size: 15px;
  color: #666;
  position: relative;
}

.category-item.active {
  color: #ff6b6b;
}

.category-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #ff6b6b;
  border-radius: 2px;
}

/* 轮播图样式 */
.banner-container {
  padding: 16px;
}

.banner-swiper {
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
}

.banner-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 20px;
}

.banner-text {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}

.banner-subtext {
  font-size: 14px;
  opacity: 0.9;
}

/* 内容区标题 */
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 10px;
}

.content-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.more-link {
  font-size: 14px;
  color: #999;
}

/* 瀑布流布局 */
.waterfall-container {
  display: flex;
  padding: 0 16px 16px;
  justify-content: space-between;
}

.waterfall-column {
  width: 48%;
}

/* 菜谱卡片 */
.recipe-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.recipe-img {
  width: 100%;
  height: 150px;
}

.recipe-info {
  padding: 12px;
}

.recipe-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
}

.recipe-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.recipe-tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  color: #ff6b6b;
  background-color: #fff0f0;
  padding: 2px 8px;
  border-radius: 10px;
  margin-right: 6px;
  margin-bottom: 6px;
}
</style>