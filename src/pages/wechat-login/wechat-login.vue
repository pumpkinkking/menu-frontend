<template>
  <view class="wechat-login-container">
    <view class="logo">
      <image src="/static/icon/logo.png" class="logo-img"/>
      <text class="app-name">情侣点餐</text>
    </view>
    <view class="login-card">
      <button @click="loginByWechat" class="wechat-btn">
        <image src="/static/icon/wechat.png" class="wechat-icon"/>
        <text>微信快捷登录</text>
      </button>
      <navigator url="/pages/login/login" class="other-login">
        <text>用其他手机号登录</text>
      </navigator>
    </view>
    <view class="agreement">
      <text>登录即同意</text>
      <text class="link">《用户协议》</text>
      <text>和</text>
      <text class="link">《隐私政策》</text>
    </view>
  </view>
</template>

<script>
import userApi from '@api/user.js';
export default {
  methods: {
    /**
     * 微信快捷登录功能
     * 通过微信登录获取code，调用后端接口获取token并存储
     */
    loginByWechat() {
      // 调用微信登录API
      uni.login({
        provider: 'weixin',
        success: (res) => {
          // 获取微信登录code
          const code = res.code;
          if (!code) {
            uni.showToast({ title: '获取code失败', icon: 'none' });
            return;
          }
          
          // 调用后端微信登录接口
          userApi.wechatLogin(code)
            .then(response => {
              const { token, userId } = response.data;
              // 存储登录状态和用户信息
              uni.setStorageSync('isLogin', true);
              uni.setStorageSync('userId', userId);
              uni.setStorageSync('token', token);
              uni.switchTab({ url: '/pages/index/index' });
            })
            .catch(error => {
              console.error('微信登录失败:', error);
              uni.showToast({ title: '微信登录失败', icon: 'none' });
            });
        },
        fail: (error) => {
          console.error('获取微信登录凭证失败:', error);
          uni.showToast({ title: '微信登录失败，请重试', icon: 'none' });
        }
      });
    }
  }
};
</script>

<style scoped>
.wechat-login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 0 30px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}
.logo {
  margin-top: 100px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-img {
  width: 120px;
  height: 120px;
  margin-bottom: 20px;
}
.app-name {
  font-size: 28px;
  font-weight: bold;
  color: #333;
}
.login-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wechat-btn {
  width: 100%;
  height: 55px;
  background-color: #07c160;
  color: white;
  border: none;
  border-radius: 27px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
.wechat-icon {
  width: 28px;
  height: 28px;
}
.other-login {
  color: #666;
  font-size: 14px;
}
.agreement {
  position: absolute;
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #999;
  font-size: 12px;
}
.link {
  color: #007AFF;
}
</style>