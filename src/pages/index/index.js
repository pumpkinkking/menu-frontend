// 导入模拟数据
const { recipeCategories, menuCategories, productCategories, orderFilters, recipes, ingredients, menuItems, orders, products, statsData, tabs } = require('../../mock/data');
const Fridge = require('./subpages/Fridge/index');
const Menu = require('./subpages/Menu/Menu');
const Order = require('./subpages/Order/index');
const Shop = require('./subpages/Shop/index');
const RecipeSquare = require('./subpages/RecipeSquare/index');
const Basket = require('./subpages/Basket/index');

// 注册页面
Page({
  usingComponents: {
    Fridge: './subpages/Fridge/index',
    Menu: './subpages/Menu/Menu',
    Order: './subpages/Order/index',
    Shop: './subpages/Shop/index',
    RecipeSquare: './subpages/RecipeSquare/index',
    Basket: './subpages/Basket/index'
  },
  data: {
    currentTab: 0, // 当前选中的Tab索引，默认厨房
    recipeCategories: [],
    menuCategories: [],
    productCategories: [],
    orderFilters: [],
    recipes: [],
    ingredients: [],
    menuItems: [],
    orders: [],
    products: [],
    statsData: {},
    tabs: [],
    basketItems: []
  },
  onLoad() {
    // 页面加载时初始化数据，避免直接引用外部对象
    this.setData({
      recipeCategories: [...recipeCategories],
      menuCategories: [...menuCategories],
      productCategories: [...productCategories],
      orderFilters: [...orderFilters],
      recipes: [...recipes],
      ingredients: [...ingredients],
      menuItems: [...menuItems],
      orders: [...orders],
      products: [...products],
      statsData: {...statsData},
      tabs: [...tabs]
    });
  },
      // 处理分类点击事件
      handleCategoryClick(category) {
        // 找到对应的分类数组键名
        const categoryKey = Object.keys(this.data).find(key => 
          Array.isArray(this.data[key]) && this.data[key].some(item => item.id === category.id)
        );
        
        if (categoryKey) {
          // 创建分类数组副本并更新active状态
          const updatedCategories = this.data[categoryKey].map(item => ({
            ...item,
            active: item.id === category.id
          }));
          
          // 使用setData更新数据
          this.setData({
            [categoryKey]: updatedCategories
          });
        }
      },
      handleFilterClick(filter) {
        // 创建筛选器数组副本并更新active状态
        const updatedFilters = this.data.orderFilters.map(item => ({
          ...item,
          active: item.id === filter.id
        }));
        
        // 使用setData更新数据
        this.setData({
          orderFilters: updatedFilters
        });
      },
      switchTab(index) {
        this.setData({
          currentTab: index
        });
      },
    addToCart(item) {
    // 添加到购物车逻辑
    const newBasketItems = [...this.data.basketItems, item];
    this.setData({
      basketItems: newBasketItems
    });
    wx.showToast({ title: '已添加到购物车', icon: 'success', duration: 1500 });
  },
   payOrder(orderId) {
    // 支付订单逻辑
    wx.showToast({ title: '支付功能待实现', icon: 'none', duration: 1500 });
  },
    /**
     * 处理添加新食材
     * @param {Object} newIngredient - 新食材对象
     */
  handleAddIngredient(newIngredient) {
    const newIngredients = [...this.data.ingredients, newIngredient];
    this.setData({
      ingredients: newIngredients
    });
  },
    /**
     * 处理添加自定义奖励
     * @param {Object} reward - 新添加的奖励对象
     */
  handleAddReward(reward) {
    // 将新奖励添加到商品列表
    const newProduct = {
      ...reward,
      image: '/static/images/reward-default.png', // 默认奖励图片
      spec: reward.description || '自定义奖励',
      price: reward.points,
      categoryId: 'custom'
    };
    const newProducts = [...this.data.products, newProduct];
    this.setData({
      products: newProducts
    });
  },
  
    handleTabClick(event) {
      // 从事件对象中获取自定义数据
      const tab = event.currentTarget.dataset;
      const tabType = tab.type || 'switch';
      const parsedIndex = parseInt(tab.index, 10);
      const index = isNaN(parsedIndex) ? 0 : parsedIndex;
      
      if (tabType === 'navigate' && tab.path) {
        this.navigateTo(tab.path);
      } else {
        this.switchTab(index);
      }
    },
  navigateTo(url) {
    if (!url) {
      wx.showToast({ title: '无效的页面路径', icon: 'error' });
      return;
    }
    
    // 确保URL以/开头
    const formattedUrl = url.startsWith('/') ? url : `/${url}`;
    
    wx.navigateTo({
      url: formattedUrl,
      fail: (err) => {
        wx.showToast({ title: '导航失败', icon: 'error' });
        console.error('Navigation failed:', err);
      }
    });
  },
  startCollaboration() {
    // 跳转到协作中心
    wx.switchTab({
      url: '/pages/collaboration/collaboration'
    });
  }
})