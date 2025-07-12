Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: '_showChange'
    }
  },
  data: {
    dish: {
      name: '',
      quantity: 1,
      unit: '个'
    },
    animationData: {}
  },
  methods: {
    // 打开弹窗动画
    openAnimation() {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-out'
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.setData({ animationData: animation.export() });
      setTimeout(() => {
        animation.translateY(0).step();
        this.setData({ animationData: animation.export() });
      }, 10);
    },
    // 关闭弹窗动画
    closeAnimation() {
      const animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease-in'
      });
      this.animation = animation;
      animation.translateY(300).step();
      this.setData({ animationData: animation.export() });
    },
    handleCancel() {
      this.triggerEvent('close');
    },
    handleConfirm() {
      if (!this.data.dish.name.trim()) {
        wx.showToast({ title: '请输入食材名称', icon: 'none' });
        return;
      }
      this.triggerEvent('confirm', { ...this.data.dish });
      this.setData({
        dish: { name: '', quantity: 1, unit: '个' }
      });
    },
    // 输入处理函数
    handleNameInput(e) {
      this.setData({ 'dish.name': e.detail.value });
    },
    handleQuantityInput(e) {
      this.setData({ 'dish.quantity': parseInt(e.detail.value) || 1 });
    },
    handleUnitInput(e) {
      this.setData({ 'dish.unit': e.detail.value });
    }
  },
  // 属性变化观察者
  observers: {
    '_showChange': function(newVal) {
      if (newVal) {
        this.openAnimation();
        // 禁止背景滚动
        wx.setPageStyle({
          style: { overflow: 'hidden' }
        });
      } else {
        this.closeAnimation();
        // 恢复背景滚动
        wx.setPageStyle({
          style: { overflow: 'auto' }
        });
      }
    }
  }
})