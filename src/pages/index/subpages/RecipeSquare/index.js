// 菜谱广场Tab组件逻辑
Page({
  data: {
    activeFilter: 'recommend',
    categoryIndex: 0,
    mealTimeIndex: 0,
    cuisineIndex: 0,
    categories: ['品类', '蔬菜', '肉类', '海鲜', '豆制品', '菌菇类', '主食'],
    mealTimes: ['餐时', '早饭', '中饭', '晚饭'],
    cuisines: ['菜系', '鲁菜', '川菜', '粤菜', '苏菜', '闽菜', '浙菜', '湘菜', '徽菜'],
    recipes: [],
    filteredRecipes: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从父页面接收菜谱列表数据
    if (options.recipes) {
      this.setData({
        recipes: JSON.parse(options.recipes)
      }, () => {
        // 初始筛选菜谱
        this.filterRecipes();
      });
    }
  },
  /**
   * 根据筛选条件过滤菜谱列表
   */
  filterRecipes() {
    const { activeFilter, categoryIndex, mealTimeIndex, cuisineIndex, categories, mealTimes, cuisines, recipes } = this.data;
    let result = [...recipes];

    if (activeFilter === 'recommend') {
      result = result.filter(recipe => recipe.recommend);
    } else {
      // 品类筛选
      if (categoryIndex > 0) {
        const category = categories[categoryIndex];
        result = result.filter(recipe => recipe.category === category);
      }
      
      // 餐时筛选
      if (mealTimeIndex > 0) {
        const mealTime = mealTimes[mealTimeIndex];
        result = result.filter(recipe => recipe.mealTime === mealTime);
      }
      
      // 菜系筛选
      if (cuisineIndex > 0) {
        const cuisine = cuisines[cuisineIndex];
        result = result.filter(recipe => recipe.cuisine === cuisine);
      }
    }

    this.setData({
      filteredRecipes: result
    });
  },
  /**
   * 切换筛选类型
   * @param {Object} e - 事件对象
   */
  switchFilter(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      activeFilter: type,
      // 重置其他筛选器索引
      categoryIndex: type !== 'category' ? 0 : this.data.categoryIndex,
      mealTimeIndex: type !== 'mealTime' ? 0 : this.data.mealTimeIndex,
      cuisineIndex: type !== 'cuisine' ? 0 : this.data.cuisineIndex
    }, () => {
      this.filterRecipes();
    });
  },
  /**
   * 品类选择变化事件
   * @param {Object} e - 事件对象
   */
  bindCategoryChange(e) {
    this.setData({
      categoryIndex: e.detail.value,
      activeFilter: 'category'
    }, () => {
      this.filterRecipes();
    });
  },
  /**
   * 餐时选择变化事件
   * @param {Object} e - 事件对象
   */
  bindMealTimeChange(e) {
    this.setData({
      mealTimeIndex: e.detail.value,
      activeFilter: 'mealTime'
    }, () => {
      this.filterRecipes();
    });
  },
  /**
   * 菜系选择变化事件
   * @param {Object} e - 事件对象
   */
  bindCuisineChange(e) {
    this.setData({
      cuisineIndex: e.detail.value,
      activeFilter: 'cuisine'
    }, () => {
      this.filterRecipes();
    });
  }
});