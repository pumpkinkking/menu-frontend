// 商店Tab组件逻辑
Page({
  data: {
    showAddRewardDialog: false,
    newReward: {
      name: '',
      points: 0,
      description: ''
    },
    productCategories: [],
    products: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从父页面接收商品分类和商品列表数据
    if (options.productCategories) {
      this.setData({
        productCategories: JSON.parse(options.productCategories)
      });
    }
    if (options.products) {
      this.setData({
        products: JSON.parse(options.products)
      });
    }
  },
  /**
   * 处理分类点击事件
   * @param {Object} e - 事件对象
   */
  handleCategoryClick(e) {
    const category = e.currentTarget.dataset.item;
    // 触发父页面事件
    this.triggerEvent('category-click', category);
  },
  /**
   * 触发添加到购物车事件
   * @param {Object} e - 事件对象
   */
  addToCart(e) {
    const product = e.currentTarget.dataset.item;
    // 触发父页面事件
    this.triggerEvent('add-to-cart', product);
  },
  /**
   * 处理奖励名称输入
   * @param {Object} e - 事件对象
   */
  handleRewardNameInput(e) {
    this.setData({
      'newReward.name': e.detail.value
    });
  },
  /**
   * 处理积分数量输入
   * @param {Object} e - 事件对象
   */
  handleRewardPointsInput(e) {
    this.setData({
      'newReward.points': parseInt(e.detail.value) || 0
    });
  },
  /**
   * 处理奖励描述输入
   * @param {Object} e - 事件对象
   */
  handleRewardDescInput(e) {
    this.setData({
      'newReward.description': e.detail.value
    });
  },
  /**
   * 添加自定义奖励
   */
  addReward() {
    const { name, points } = this.data.newReward;
    if (!name || !points) {
      wx.showToast({ title: '请填写必填项', icon: 'none' });
      return;
    }
    // 触发父组件添加奖励事件
    this.triggerEvent('add-reward', {
      ...this.data.newReward,
      id: Date.now() // 生成临时ID
    });
    // 重置表单并关闭模态框
    this.setData({
      newReward: { name: '', points: 0, description: '' },
      showAddRewardDialog: false
    });
    wx.showToast({ title: '奖励添加成功' });
  }
});