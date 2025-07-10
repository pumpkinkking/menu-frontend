<template>
  <view class="register-container">
    <view class="logo">
      <text class="title">账号注册</text>
    </view>
    <form class="register-form">
      <view class="form-group">
        <input type="number" v-model="phone" placeholder="请输入手机号" class="input"/>
      </view>
      <view class="form-group code-group">
        <input type="number" v-model="code" placeholder="请输入验证码" class="input code-input"/>
        <button @click="getCode" :disabled="countdown > 0" class="code-btn">{{countdown > 0 ? `${countdown}s后重新获取` : '获取验证码'}}</button>
      </view>
      <view class="form-group">
        <input type="password" v-model="password" placeholder="请设置密码(6-16位)" class="input"/>
      </view>
      <view class="form-group">
        <input type="password" v-model="confirmPassword" placeholder="请确认密码" class="input"/>
      </view>
      <button @click="register" class="register-btn">注册</button>
      <view class="navigate">
        <navigator url="/pages/login/login" class="login-link">已有账号？去登录</navigator>
      </view>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      confirmPassword: '',
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
    register() {
      if (!this.phone || !this.code || !this.password || !this.confirmPassword) {
        uni.showToast({ title: '请完善注册信息', icon: 'none' });
        return;
      }
      if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        uni.showToast({ title: '请输入正确的手机号', icon: 'none' });
        return;
      }
      if (this.password.length < 6 || this.password.length > 16) {
        uni.showToast({ title: '密码长度需在6-16位之间', icon: 'none' });
        return;
      }
      if (this.password !== this.confirmPassword) {
        uni.showToast({ title: '两次密码输入不一致', icon: 'none' });
        return;
      }
      // 模拟注册成功
      uni.showToast({ title: '注册成功', icon: 'success' });
      setTimeout(() => {
        uni.navigateTo({ url: '/pages/login/login' });
      }, 1500);
    }
  }
};
</script>

<style scoped>
.register-container {
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
.register-form {
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
.register-btn {
  width: 100%;
  height: 50px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 0;
}
.navigate {
  margin-top: 20px;
  text-align: center;
}
.login-link {
  color: #ff6b6b;
  font-size: 14px;
}
</style>