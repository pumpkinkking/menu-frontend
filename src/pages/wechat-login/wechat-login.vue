<template>
  <view class="wechat-login-container">
    <view class="logo">
      <image src="../../static/logo.png" class="logo-img"/>
    </view>
    <view class="login-card">
      <button @click="loginByWechat" class="wechat-btn">
        <text>微信快捷登录</text>
      </button>
      <navigator url="/pages/login/login" class="other-login">
        <text>用其他手机号登录</text>
      </navigator>
    </view>
    <view class="agreement">
      <checkbox-group @change="handleAgreeChange">
        <checkbox value="agreed" class="custom-checkbox"></checkbox>
      </checkbox-group>
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
  data() {
    return {
      isAgreed: false
    };
  },
  methods: {
    handleAgreeChange(e) {
      // 复选框组返回选中值数组
      this.isAgreed = e.detail.value.includes('agreed');
    },
        /**
     * 微信快捷登录功能
     * 通过微信登录获取code，调用后端接口获取token并存储
     */
    loginByWechat() {
      if (!this.isAgreed) {
        uni.showToast({
          title: '请先阅读并同意用户协议',
          icon: 'none'
        });
        return;
      }
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
              const { token, userId } = response;
              // 存储登录状态和用户信息
              uni.setStorageSync('isLogin', true);
              uni.setStorageSync('userId', userId);
              uni.setStorageSync('token', token);
              uni.switchTab({ url: '/pages/index/index' });
            })
            .catch(error => {
              console.error('微信登录失败详情:', error);
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
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}
.app-name {
  font-size: 20px;
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
  width: 80%;
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
.custom-checkbox .wx-checkbox-input {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  border-color: #999;
}
.custom-checkbox .wx-checkbox-input-checked {
  background-color: #07c160;
  border-color: #07c160;
}
</style>