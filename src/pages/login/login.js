Page({
  data: {
    phone: '',
    code: '',
    countdown: 0
  },
  handlePhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },
  handleCodeInput(e) {
    this.setData({ code: e.detail.value });
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
  login() {
    if (!this.data.phone || !this.data.code) {
      wx.showToast({ title: '请填写手机号和验证码', icon: 'none' });
      return;
    }
    // 模拟登录成功
    wx.setStorageSync('isLogin', true);
    wx.switchTab({ url: '/src/pages/index/index' });
  },
  navigateToRegister() {
    wx.navigateTo({ url: '/src/pages/register/register' });
  }
})