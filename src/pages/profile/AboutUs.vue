<template>
  <view class="about-container">
    <view class="page-title">关于我们</view>

    <view class="about-content">
      <view class="section">
        <text class="section-title">项目介绍</text>
        <text class="section-desc">
          本项目是一款专注于食材管理的智能应用，旨在帮助用户更好地管理家中食材，减少浪费，合理规划饮食。通过简单直观的操作，用户可以轻松记录食材信息、设置保质期提醒、查看营养建议等。
        </text>
      </view>

      <view class="section">
        <text class="section-title">功能特点</text>
        <view class="feature-list">
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">食材信息智能管理，支持多维度分类</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">保质期自动提醒，减少食材浪费</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">个性化饮食建议，助力健康生活</text>
          </view>
          <view class="feature-item">
            <text class="feature-icon">✓</text>
            <text class="feature-text">简洁直观的界面设计，操作便捷</text>
          </view>
        </view>
      </view>

      <view class="section">
        <text class="section-title">联系我们</text>
        <view class="contact-info">
          <text class="contact-item">邮箱：support@foodmanager.com</text>
          <text class="contact-item">微信公众号：食材管理助手</text>
          <text class="contact-item">反馈建议：通过应用内"建议箱"提交</text>
        </view>
      </view>

      <view class="section">
        <text class="section-title">开发团队</text>
        <text class="section-desc">
          我们是一群热爱生活、关注健康的开发者，致力于通过技术改善人们的日常生活。如果您喜欢我们的产品，欢迎通过"投喂"页面支持我们的开发工作！
        </text>
      </view>
    </view>

    <view class="copyright">
      © 2023 食材管理助手 - 让生活更健康，让食材不浪费
    </view>
  </view>
</template>

<script>
// 关于我们页面主要展示静态信息，无需复杂交互

export default {
  data() {
    return {
      // 可根据需要添加动态数据
    };
  },
  onLoad() {
    // 页面加载时的初始化操作
    uni.setNavigationBarTitle({
      title: '关于我们'
    });
  }
};
</script>

<style scoped>
.about-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin: 30rpx 0 40rpx;
  color: #333;
}

.about-content {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 30rpx;
}

.section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
  padding-bottom: 10rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.section-desc {
  font-size: 28rpx;
  line-height: 1.6;
  color: #666;
}

.feature-list {
  margin-top: 15rpx;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
  font-size: 28rpx;
  line-height: 1.6;
}

.feature-icon {
  color: #007aff;
  margin-right: 15rpx;
  font-weight: bold;
}

.feature-text {
  color: #666;
  flex: 1;
}

.contact-info {
  margin-top: 15rpx;
}

.contact-item {
  display: block;
  margin-bottom: 15rpx;
  font-size: 28rpx;
  color: #666;
}

.copyright {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  margin-top: 60rpx;
  padding-top: 20rpx;
  border-top: 2rpx solid #f0f0f0;
}
</style>