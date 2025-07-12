Page({
  data: {
    showQrCodeModal: false,
    qrCodeUrl: '/static/images/invite-qr.png', // 二维码图片路径
    menuCategories: [],
    menuItems: []
  },
  
  properties: {
    menuCategories: {
      type: Array,
      value: [],
      observer: function(newVal) {
        this.setData({ menuCategories: newVal });
      }
    },
    menuItems: {
      type: Array,
      value: [],
      observer: function(newVal) {
        this.setData({ menuItems: newVal });
      }
    }
  },
  
  methods: {
    /**
     * 处理分类点击事件
     */
    handleCategoryClick(e) {
      const category = e.currentTarget.dataset.category;
      this.triggerEvent('category-click', category);
    },
    
    /**
     * 触发添加到购物车事件
     */
    addToCart(e) {
      const item = e.currentTarget.dataset.item;
      this.triggerEvent('add-to-cart', item);
    },
    
    /**
     * 处理摇一摇按钮点击事件
     */
    handleShake() {
      wx.showToast({ title: '摇一摇功能待实现', icon: 'none' });
    },
    
    /**
     * 处理邀请按钮点击事件
     */
    handleInvite() {
      this.setData({ showQrCodeModal: true });
    },
    
    /**
     * 处理分享按钮点击事件
     */
    handleShare() {
      wx.shareAppMessage({
        title: '邀请你一起使用美食菜单',
        path: '/pages/index/index',
        success: () => {
          wx.showToast({ title: '分享成功', icon: 'success' });
        },
        fail: () => {
          wx.showToast({ title: '分享失败', icon: 'none' });
        }
      });
    },
    
    /**
     * 处理保存按钮点击事件
     */
    handleSave() {
      wx.downloadFile({
        url: this.data.qrCodeUrl,
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.showToast({ title: '保存成功', icon: 'success' });
            },
            fail: () => {
              wx.showToast({ title: '保存失败', icon: 'none' });
            }
          });
        }
      });
    },
    
    /**
     * 处理下单按钮点击事件
     */
    handleOrder() {
      this.triggerEvent('go-to-order');
    }
  }
});