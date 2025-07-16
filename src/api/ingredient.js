import request from './axios';

/**
 * API路径前缀配置
 */
const API_PREFIX = {
  ingredient: '/ingredients',
  basket: '/basket'
};

/**
 * 统一错误处理
 */
const handleResponse = (promise) => {
  return promise
    .then(response => {
      if (response.data.code === 200) { // 根据实际接口规范调整
        return response.data.data;
      }
      throw new Error(response.data.message || '请求失败');
    })
    .catch(error => {
      console.error('API请求错误:', error);
      throw error;
    });
};

/**
 * 食材相关API接口封装
 */
export const ingredientService = {
  /**
   * 获取食材列表
   */
  getIngredients: () => {
    return handleResponse(request.get(`${API_PREFIX.ingredient}/getIngredientList`));
  }, 

  /**
   * 添加食材
   */
  addIngredient: (ingredientDTO) => {
    return handleResponse(request.post(`${API_PREFIX.ingredient}/addIngredient`, ingredientDTO));
  }, 

  /**
   * 删除食材
   */
  deleteIngredient: (id) => {
    return handleResponse(request.delete(`${API_PREFIX.ingredient}/deleteIngredient`, { data: { id } }));
  },

  /**
   * 获取菜篮子列表
   */
  getBasketList: () => {
    return handleResponse(request.get(`${API_PREFIX.basket}/getBasketList`));
  }, 

  /**
   * 添加食材到菜篮子
   */
  addToBasket: (basketDTO) => {
    return handleResponse(request.post(`${API_PREFIX.basket}/addToBasket`, basketDTO));
  }, 

  /**
   * 从菜篮子移除食材
   */
  removeFromBasket: (ingredientId) => {
    return handleResponse(request.delete(`${API_PREFIX.basket}/removeFromBasket`, { data: { ingredientId } }));
  }
};

// 仅导出对象，避免命名空间混乱
export default ingredientService;