<template>
  <view class="suggestion-container">
    <view class="page-title">建议箱</view>
    
    <form class="suggestion-form" @submit.prevent="submitSuggestion">
      <view class="form-group">
        <text class="form-label">您的建议 *</text>
        <textarea v-model="suggestionContent" class="form-input" placeholder="请输入您的宝贵建议" required></textarea>
      </view>
      
      <view class="form-group">
        <text class="form-label">联系方式（选填）</text>
        <input type="text" v-model="contactInfo" class="form-input" placeholder="邮箱或手机号，方便我们回复您"/>
      </view>
      
      <button type="submit" class="submit-btn">提交建议</button>
    </form>
  </view>
</template>

<script>
// 引入mock服务
import { submitSuggestion } from '@/mock/data.js';

export default {
  data() {
    return {
      suggestionContent: '',
      contactInfo: ''
    };
  },
  methods: {
    /**
     * 提交建议
     */
    async submitSuggestion() {
      if (!this.suggestionContent.trim()) {
        uni.showToast({
          title: '请输入建议内容',
          icon: 'none'
        });
        return;
      }

      try {
        // 调用mock接口提交建议
        const result = await submitSuggestion({
          content: this.suggestionContent,
          contact: this.contactInfo,
          submitTime: new Date().toISOString()
        });

        if (result.success) {
          uni.showToast({
            title: '感谢您的建议！',
            icon: 'success'
          });
          // 清空表单
          this.suggestionContent = '';
          this.contactInfo = '';
          // 返回上一页
          setTimeout(() => {
            uni.navigateBack();
          }, 1500);
        } else {
          uni.showToast({
            title: '提交失败，请稍后重试',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('提交建议失败:', error);
        uni.showToast({
          title: '系统错误，请稍后重试',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style scoped>
.suggestion-container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.page-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin: 30rpx 0 50rpx;
  color: #333;
}

.form-group {
  margin-bottom: 30rpx;
}

.form-label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #666;
}

.form-input {
  width: 100%;
  padding: 15rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  font-size: 28rpx;
  background-color: #fff;
  box-sizing: border-box;
}

textarea.form-input {
  height: 200rpx;
  min-height: 200rpx;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
  font-size: 32rpx;
  margin-top: 20rpx;
}
</style>