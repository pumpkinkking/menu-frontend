Page({
  data: {
    phone: '',
    code: '',
    password: '',
    countdown: 0
  },
  handlePhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },
  handleCodeInput(e) {
    this.setData({ code: e.detail.value });
  },
  handlePasswordInput(e) {
    this.setData({ password: e.detail.value });
  },
  getVerificationCode() {
    if (!this.data.phone || this.data.phone.length !== 11) {
      wx.showToast({ title: '请输入有效的手机号', icon: 'none' });
      return;
    }
    // 模拟发送验证码
    let countdown = 60;
    this.setData({ countdown });
    const timer = setInterval(() => {
      countdown--;
      this.setData({ countdown });
      if (countdown <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    wx.showToast({ title: '验证码已发送', icon: 'success' });
  },
  register() {
    if (!this.data.phone || !this.data.code || !this.data.password) {
      wx.showToast({ title: '请填写完整信息', icon: 'none' });
      return;
    }
    if (this.data.password.length < 6) {
      wx.showToast({ title: '密码长度不能少于6位', icon: 'none' });
      return;
    }
    // 模拟注册成功
    wx.showToast({ title: '注册成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateTo({ url: '/src/pages/login/login' });
    }, 1500);
  },
  navigateToLogin() {
    wx.navigateTo({ url: '/src/pages/login/login' });
  }
})