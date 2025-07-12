// 导入全局状态管理工具
const store = require('../../utils/store.js');

Page({
  data: {
    // 添加食材弹窗显示状态
    showAddDialog: false,
    // 购物篮数据
    basketItems: []
  },

  onLoad() {
    // 从全局状态加载购物篮数据
    const basketData = store.getData('basketItems') || [];
    this.setData({ basketItems: basketData });
  },

  /**
   * 显示添加菜品弹窗
   */
  showAddDialog() {
    this.setData({ showAddDialog: true });
  },

  /**
   * 关闭添加菜品弹窗
   */
  onCloseDialog() {
    this.setData({ showAddDialog: false });
  },

  /**
   * 处理从弹窗组件确认添加食材
   * @param {Object} e - 事件对象，包含弹窗返回的食材数据
   */
  handleAddIngredient(e) {
    const dish = e.detail;
    const { basketItems } = this.data;

    // 检查是否已存在同名食材
    const existingIndex = basketItems.findIndex(
      item => item.name === dish.name
    );

    if (existingIndex > -1) {
      // 如果已存在，增加数量
      basketItems[existingIndex].quantity += dish.quantity;
    } else {
      // 如果不存在，添加新食材
      basketItems.push({
        id: Date.now(),
        ...dish
      });
    }

    // 更新本地数据和全局状态
    this.setData({ basketItems });
    store.setData('basketItems', basketItems);

    wx.showToast({ title: '添加成功', icon: 'success' });
  },

  /**
   * 从菜篮子中删除食材
   * @param {Object} e - 事件对象，包含食材索引
   */
  removeIngredient(e) {
    const { index } = e.currentTarget.dataset;
    const { basketItems } = this.data;

    // 删除指定索引的食材
    basketItems.splice(index, 1);

    // 更新本地数据和全局状态
    this.setData({ basketItems });
    store.setData('basketItems', basketItems);

    wx.showToast({ title: '已删除', icon: 'none' });
  }
});