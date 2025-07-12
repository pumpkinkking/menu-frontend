Page({
  data: {
    showAddDialog: false,
    basketItems: []
  },
  onLoad() {
    // 从本地存储加载购物清单数据
    const storedItems = wx.getStorageSync('basketItems');
    if (storedItems) {
      this.setData({ basketItems: storedItems });
    }
  },
  onUnload() {
    // 保存购物清单数据到本地存储
    wx.setStorageSync('basketItems', this.data.basketItems);
  },
  showAddDialog() {
    this.setData({ showAddDialog: true });
  },
  hideAddDialog() {
    this.setData({ showAddDialog: false });
  },
  handleAddIngredient(e) {
    const newItem = e.detail;
    if (!newItem.name || !newItem.quantity || !newItem.unit) return;

    // 生成新ID
    const newId = this.data.basketItems.length > 0
      ? Math.max(...this.data.basketItems.map(item => item.id)) + 1
      : 1;

    this.setData({
      basketItems: [...this.data.basketItems, { id: newId, ...newItem }],
      showAddDialog: false
    });
    wx.showToast({ title: '添加成功', icon: 'success' });
  },
  removeIngredient(e) {
    const index = e.currentTarget.dataset.index;
    const newItems = this.data.basketItems.filter((_, i) => i !== index);
    this.setData({ basketItems: newItems });
    wx.showToast({ title: '已删除', icon: 'none' });
  }
});