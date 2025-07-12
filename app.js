// 微信小程序入口文件
App({
  onLaunch: function() {
    console.log('App Launch')
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    this.globalData.statusBarHeight = systemInfo.statusBarHeight;
    this.globalData.safeArea = systemInfo.safeArea;
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  globalData: {
    // 全局数据存储
    ingredients: [],
    basketItems: []
  }
})