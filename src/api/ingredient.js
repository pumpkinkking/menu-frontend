import request from './axios';

/**
 * API路径前缀配置
 */
const API_PREFIX = {
  ingredient: '/ingredients',
  basket: '/basket'
};


/**
 * 食材相关API接口封装
 */
export const ingredientService = {
  /**
   * 获取食材列表
   */
  getIngredients: () => {
    return request.get(`${API_PREFIX.ingredient}/getIngredientList`);
  }, 

  /**
   * 添加食材
   */
  addIngredient: (ingredientDTO) => {
    return request.post(`${API_PREFIX.ingredient}/addIngredient`, ingredientDTO);
  }, 

  /**
   * 删除食材
   */
  deleteIngredient: (id) => {
    return request.delete(`${API_PREFIX.ingredient}/deleteIngredient`, { data: { id } });
  },

  /**
   * 获取菜篮子列表
   */
  getBasketList: (userId) => {
    return request.get(`${API_PREFIX.basket}/getBasketList`, { params: { userId } });
  }, 

  /**
   * 添加食材到菜篮子
   */
  addToBasket: (basketDTO) => {
    return request.post(`${API_PREFIX.basket}/addToBasket`, basketDTO);
  }, 

  /**
   * 从菜篮子移除食材
   */
  removeFromBasket: (ingredientId) => {
    return request.delete(`${API_PREFIX.basket}/removeFromBasket`, { data: { ingredientId } });
  }
};

// 仅导出对象，避免命名空间混乱
export default ingredientService;