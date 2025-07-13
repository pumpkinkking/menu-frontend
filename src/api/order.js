import request from './axios';

/**
 * 订单相关API接口封装
 */
const orderApi = {
  /**
   * 创建订单
   * @param {Object} orderDTO - 订单数据传输对象
   * @param {string} orderDTO.date - 订单日期
   * @param {Array} orderDTO.dishes - 菜品列表
   * @param {number} orderDTO.totalPrice - 订单总价
   * @returns {Promise<number>} - 订单ID
   */
  createOrder: (orderDTO) => {
    return request.post('/orders', orderDTO);
  },

  /**
   * 获取订单列表
   * @returns {Promise<Array>} - 订单列表
   */
  getOrders: () => {
    return request.get('/orders');
  },

  /**
   * 获取订单详情
   * @param {number} id - 订单ID
   * @returns {Promise<Object>} - 订单详情
   */
  getOrderDetail: (id) => {
    return request.get(`/orders/${id}`);
  },

  /**
   * 创建支付订单
   * @param {Object} params - 支付参数
   * @param {string} params.orderNo - 订单编号
   * @param {number} params.totalFee - 总金额
   * @param {string} params.openid - 用户openid
   * @param {string} params.body - 订单描述
   * @returns {Promise<Object>} - 微信支付参数
   */
  createPayOrder: (params) => {
    return request.post('/pay/createOrder', null, {
      params
    });
  },

  /**
   * 处理支付通知
   * @param {string} notifyData - 支付通知数据
   * @returns {Promise<string>} - 处理结果
   */
  handlePayNotify: (notifyData) => {
    return request.post('/pay/notify', notifyData);
  }
};

export default orderApi;