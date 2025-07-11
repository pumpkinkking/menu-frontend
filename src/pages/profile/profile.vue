<template>
  <view class="profile-container">
    <!-- 顶部个人信息区 -->
    <view class="top-profile">
      <view class="profile-header">
        <view class="avatar-container">
          <image class="avatar" :src="userInfo.avatarUrls.you"></image>
          <image class="avatar couple" :src="userInfo.avatarUrls.partner"></image>
        </view>
        <view class="profile-info">
          <text class="couple-name">{{ userInfo.coupleName }}</text>
          <text class="love-level">爱情等级 Lv.{{ userInfo.loveLevel }}</text>
        </view>
      </view>
    </view>

    <!-- 中部情侣数据看板 -->
    <view class="stats-board">
      <view class="stat-item" v-for="stat in stats" :key="stat.id">
        <text class="stat-value">{{ stat.value }}</text>
        <text class="stat-label">{{ stat.label }}</text>
      </view>
    </view>

    <!-- 底部功能菜单 -->
    <view class="function-menu">
      <view class="menu-section" v-for="section in menuSections" :key="section.id">
        <view class="menu-item" v-for="item in section.items" :key="item.id" @click="navigateTo(item.path)">
          <image class="menu-icon" :src="item.icon"></image>
          <text class="menu-name">{{ item.name }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import profileMock from '@/mock/profile';

export default {
  data() {
    return {
      userInfo: profileMock.userInfo,
      stats: profileMock.stats,
      menuSections: profileMock.menuSections
    };
  },
  methods: {
    /**
     * 导航到指定页面
     * @param {string} path - 目标页面路径
     */
    navigateTo(path) {
      if (path) {
        uni.navigateTo({
          url: path
        });
      }
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