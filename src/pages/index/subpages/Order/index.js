// 订单Tab组件逻辑
Page({
  data: {
    orderFilters: [],
    orders: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 从父页面接收订单筛选器和订单列表数据
    if (options.orderFilters) {
      this.setData({
        orderFilters: JSON.parse(options.orderFilters)
      });
    }
    if (options.orders) {
      this.setData({
        orders: JSON.parse(options.orders)
      });
    }
  },
  /**
   * 处理筛选器点击事件
   * @param {Object} e - 事件对象
   */
  handleFilterClick(e) {
    const filter = e.currentTarget.dataset.item;
    // 触发父页面事件
    this.triggerEvent('filter-click', filter);
  },
  /**
   * 触发订单支付事件
   * @param {Object} e - 事件对象
   */
  payOrder(e) {
    const orderId = e.currentTarget.dataset.orderId;
    // 触发父页面事件
    this.triggerEvent('pay-order', orderId);
  }
});