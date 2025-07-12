Page({
  data: {
    currentLocation: 'all',
    showAddDialog: false,
    newIngredient: {
      name: '',
      quantity: 1,
      unit: '个',
      location: '冷藏',
      freshness: '新鲜'
    },
    ingredients: []
  },
  onLoad(options) {
    // 可以从父页面或全局数据获取食材数据
    if (options.ingredients) {
      this.setData({
        ingredients: JSON.parse(options.ingredients)
      });
    }
  },
  computed: {
    filteredIngredients() {
      const { currentLocation, ingredients } = this.data;
      const filtered = currentLocation === 'all'
        ? ingredients
        : ingredients.filter(ingredient => ingredient.location === currentLocation);

      return filtered.map(ingredient => ({
        ...ingredient,
        freshnessClass: this.getFreshnessClass(ingredient.freshness)
      }));
    }
  },
  methods: {
    getFreshnessClass(freshness) {
      switch(freshness) {
        case '新鲜': return 'fresh';
        case '一般': return 'normal';
        case '过期': return 'expired';
        default: return '';
      }
    },
    showAddIngredientDialog() {
      this.setData({
        newIngredient: {
          name: '',
          quantity: 1,
          unit: '个',
          location: '冷藏',
          freshness: '新鲜'
        },
        showAddDialog: true
      });
    },
    hideAddDialog() {
      this.setData({ showAddDialog: false });
    },
    changeLocation(e) {
      this.setData({ currentLocation: e.currentTarget.dataset.location });
    },
    handleNameInput(e) {
      this.setData({ 'newIngredient.name': e.detail.value });
    },
    handleQuantityInput(e) {
      this.setData({ 'newIngredient.quantity': parseInt(e.detail.value) || 1 });
    },
    handleUnitInput(e) {
      this.setData({ 'newIngredient.unit': e.detail.value });
    },
    handleLocationChange(e) {
      const locations = ['冷藏', '冷冻', '常温'];
      this.setData({ 'newIngredient.location': locations[e.detail.value] });
    },
    handleFreshnessChange(e) {
      const freshnessLevels = ['新鲜', '一般', '过期'];
      this.setData({ 'newIngredient.freshness': freshnessLevels[e.detail.value] });
    },
    submitIngredient() {
      const { name, quantity, unit } = this.data.newIngredient;
      if (!name.trim()) {
        wx.showToast({ title: '请输入食材名称', icon: 'none' });
        return;
      }

      const newId = this.data.ingredients.length > 0
        ? Math.max(...this.data.ingredients.map(item => item.id)) + 1
        : 1;

      const newItem = {
        id: newId,
        ...this.data.newIngredient
      };

      const updatedIngredients = [...this.data.ingredients, newItem];
      this.setData({ ingredients: updatedIngredients });
      this.hideAddDialog();
      wx.showToast({ title: '添加成功', icon: 'success' });
      // 可以通过事件或全局数据同步更新父页面
    }
  }
});