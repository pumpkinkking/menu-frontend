<template>
  <view class="login-container">
    <view class="logo">
      <text class="title">情侣点餐</text>
    </view>
    <form class="login-form">
      <view class="form-group">
        <input type="number" v-model="phone" placeholder="请输入手机号" class="input"/>
      </view>
      <view class="form-group code-group">
        <input type="number" v-model="code" placeholder="请输入验证码" class="input code-input"/>
        <button @click="getCode" :disabled="countdown > 0" class="code-btn">{{countdown > 0 ? `${countdown}s后重新获取` : '获取验证码'}}</button>
      </view>
      <button @click="loginByPhone" class="login-btn phone-login">手机号登录</button>
      <view class="divider">
        <view class="line"></view>
        <text class="text">其他登录方式</text>
        <view class="line"></view>
      </view>
      <button @click="loginByWechat" class="login-btn wechat-login">
        <image src="/static/icon/wechat.png" class="wechat-icon"/>
        <text>微信快捷登录</text>
      </button>
    </form>
  </view>
</template>

<script>
import userApi from '@api/user.js';

export default {
  data() {
    return {
      phone: '',
      code: '',
      countdown: 0
    };
  },
  methods: {
    getCode() {
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' });
        return;
      }
      // 模拟获取验证码
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      uni.showToast({ title: '验证码已发送', icon: 'none' });
    },
    loginByPhone() {
      if (!this.phone || !this.code) {
        uni.showToast({ title: '请完善登录信息', icon: 'none' });
        return;
      }
      // 登录成功后存储用户信息
      uni.setStorageSync('isLogin', true);
          uni.setStorageSync('userId', 'qly');
      uni.switchTab({ url: '/pages/index/index' });
    },
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
          uni.showToast({ title: '微信登录失败', icon: 'none' });
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;
}
.logo {
  margin-bottom: 60px;
  text-align: center;
}
.title {
  font-size: 32px;
  font-weight: bold;
  color: #ff6b6b;
}
.login-form {
  width: 100%;
}
.form-group {
  margin-bottom: 20px;
  position: relative;
}
.input {
  width: 100%;
  height: 50px;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  box-sizing: border-box;
}
.code-group {
  display: flex;
  gap: 10px;
}
.code-input {
  flex: 1;
}
.code-btn {
  width: 120px;
  height: 50px;
  background-color: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 25px;
  font-size: 14px;
  padding: 0;
}
.login-btn {
  width: 100%;
  height: 50px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 0;
}
.phone-login {
  background-color: #ff6b6b;
  color: white;
  border: none;
}
.wechat-login {
  background-color: #07c160;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.wechat-icon {
  width: 24px;
  height: 24px;
}
.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
}
.line {
  flex: 1;
  height: 1px;
  background-color: #eee;
}
.text {
  padding: 0 15px;
  color: #999;
  font-size: 14px;
}
.navigate {
  margin-top: 20px;
  text-align: center;
}
.register-link {
  color: #ff6b6b;
  font-size: 14px;
}
</style>