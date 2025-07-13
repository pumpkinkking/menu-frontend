import request from './axios';

/**
 * 食材相关API接口封装
 */
const ingredientApi = {
  /**
   * 获取食材列表
   * @returns {Promise<Array>} - 食材列表
   */
  getIngredients: () => {
    return request.get('/ingredients');
  },

  /**
   * 添加食材
   * @param {Object} ingredientDTO - 食材数据传输对象
   * @param {string} ingredientDTO.name - 食材名称
   * @param {number} ingredientDTO.quantity - 食材数量
   * @param {string} ingredientDTO.unit - 计量单位
   * @param {string} [ingredientDTO.location] - 存储位置
   * @param {string} [ingredientDTO.freshness] - 新鲜度
   * @returns {Promise<number>} - 食材ID
   */
  addIngredient: (ingredientDTO) => {
    return request.post('/ingredients', ingredientDTO);
  },

  /**
   * 删除食材
   * @param {number} id - 食材ID
   * @returns {Promise<boolean>} - 是否删除成功
   */
  deleteIngredient: (id) => {
    return request.delete(`/ingredients/${id}`);
  },

  /**
   * 获取菜篮子列表
   * @returns {Promise<Array>} - 菜篮子列表
   */
  getBasketItems: () => {
    return request.get('/basket');
  },

  /**
   * 添加食材到菜篮子
   * @param {Object} basketDTO - 菜篮子数据传输对象
   * @param {number} basketDTO.ingredientId - 食材ID
   * @param {number} basketDTO.quantity - 食材数量
   * @param {string} basketDTO.unit - 计量单位
   * @returns {Promise<number>} - 菜篮子项目ID
   */
  addToBasket: (basketDTO) => {
    return request.post('/basket', basketDTO);
  },

  /**
   * 从菜篮子移除食材
   * @param {number} ingredientId - 食材ID
   * @returns {Promise<boolean>} - 是否移除成功
   */
  removeFromBasket: (ingredientId) => {
    return request.delete(`/basket/${ingredientId}`);
  }
};

export default ingredientApi;