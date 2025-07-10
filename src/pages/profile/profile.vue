<template>
  <view class="profile-container">
    <!-- 顶部个人信息区 -->
    <view class="top-profile">
      <view class="profile-header">
        <view class="avatar-container">
          <image class="avatar" src="/static/avatar/you.png"></image>
          <image class="avatar couple" src="/static/avatar/partner.png"></image>
        </view>
        <view class="profile-info">
          <text class="couple-name">甜蜜情侣</text>
          <text class="love-level">爱情等级 Lv.8</text>
        </view>
      </view>
    </view>

    <!-- 中部情侣数据看板 -->
    <view class="stats-board">
      <view class="stat-item">
        <text class="stat-value">45</text>
        <text class="stat-label">共同烹饪天数</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">86%</text>
        <text class="stat-label">口味默契度</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">24</text>
        <text class="stat-label">收藏菜谱</text>
      </view>
    </view>

    <!-- 底部功能菜单 -->
    <view class="function-menu">
      <view class="menu-section">
        <view class="menu-item" @click="navigateToFridge">
          <image class="menu-icon" src="/static/icon/fridge.png"></image>
          <text class="menu-name">冰箱管理</text>
        </view>
        <view class="menu-item">
          <image class="menu-icon" src="/static/icon/collection.png"></image>
          <text class="menu-name">我的收藏</text>
        </view>
        <view class="menu-item">
          <image class="menu-icon" src="/static/icon/task.png"></image>
          <text class="menu-name">情侣任务</text>
        </view>
      </view>

      <view class="menu-section">
        <view class="menu-item">
          <image class="menu-icon" src="/static/icon/setting.png"></image>
          <text class="menu-name">设置</text>
        </view>
        <view class="menu-item">
          <image class="menu-icon" src="/static/icon/help.png"></image>
          <text class="menu-name">帮助中心</text>
        </view>
        <view class="menu-item">
          <image class="menu-icon" src="/static/icon/about.png"></image>
          <text class="menu-name">关于我们</text>
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
    navigateToFridge() {
      // 跳转到冰箱管理页面
      uni.navigateTo({
        url: '/pages/fridge/fridge'
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.profile-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 顶部个人信息区 */
.top-profile {
  background: linear-gradient(135deg, #ffccd5 0%, #ffe6e6 100%);
  padding: 40px 16px 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: white;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  display: flex;
  margin-bottom: 16px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid white;
}

.avatar.couple {
  margin-left: -15px;
}

.couple-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
}

.love-level {
  font-size: 14px;
  opacity: 0.9;
}

/* 中部数据看板 */
.stats-board {
  display: flex;
  justify-content: space-around;
  background-color: white;
  border-radius: 16px;
  padding: 20px 16px;
  margin: -10px 16px 16px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 底部功能菜单 */
.function-menu {
  padding: 0 16px 16px;
}

.menu-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.menu-item {
  background-color: white;
  border-radius: 12px;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.menu-name {
  font-size: 14px;
  color: #333;
}
</style>