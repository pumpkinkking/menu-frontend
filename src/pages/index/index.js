// 导入模拟数据
const { recipeCategories, menuCategories, productCategories, orderFilters, recipes, ingredients, menuItems, orders, products, statsData, tabs } = require('../../mock/data');

// 注册页面
Page({
  data: {
    currentTab: 0, // 当前选中的Tab索引，默认厨房
    recipeCategories,
    menuCategories,
    productCategories,
    orderFilters,
    recipes,
    ingredients,
    menuItems,
    orders,
    products,
    statsData,
    tabs,
    basketItems: []
  },
  onLoad() {
    // 页面加载时初始化数据
    const app = getApp();
    this.setData({
      ingredients: app.globalData.ingredients || ingredients,
      basketItems: app.globalData.basketItems || []
    });
  },
  methods: {
    // 处理分类点击事件
    handleCategoryClick(category) {
      const categories = this.data[Object.keys(this.data).find(key => this.data[key].includes(category))];
      categories.forEach(item => item.active = false);
      category.active = true;
      this.setData({
        [Object.keys(this.data).find(key => this.data[key].includes(category))]: categories
      });
    },
    handleFilterClick(filter) {
      const orderFilters = this.data.orderFilters.map(item => ({
        ...item,
        active: false
      }));
      filter.active = true;
      this.setData({ orderFilters });
    },
    switchTab(index) {
      this.setData({ currentTab: index });
    },
    addToCart(item) {
      wx.showToast({ title: '已添加到购物车', icon: 'success', duration: 1500 });
    },
    payOrder(orderId) {
      wx.showToast({ title: '支付功能待实现', icon: 'none', duration: 1500 });
    },
    handleAddIngredient(newIngredient) {
      const ingredients = [...this.data.ingredients, newIngredient];
      this.setData({ ingredients });
      // 更新全局数据
      getApp().globalData.ingredients = ingredients;
    },
    handleAddReward(reward) {
      const products = [...this.data.products, {
        ...reward,
        image: '/static/images/reward-default.png',
        spec: reward.description || '自定义奖励',
        price: reward.points,
        categoryId: 'custom'
      }];
      this.setData({ products });
      wx.showToast({ title: '奖励已添加到商店', icon: 'success' });
    },
    handleTabClick(tab) {
      if (tab.type === 'navigate') {
        wx.navigateTo({ url: tab.path });
      } else if (tab.type === 'switch') {
        this.switchTab(tab.index);
      }
    },
    navigateTo(url) {
      wx.navigateTo({ url });
    },
    startCollaboration() {
      wx.switchTab({
        url: '/pages/collaboration/collaboration'
      });
    }
  }
})