import request from './axios';

/**
 * 根据日期查询当日三餐数据
 * @param {string} date - 日期，格式YYYY-MM-DD
 * @returns {Promise}
 */
/**
 * 获取指定年月的日历日期数据
 * @param {number} year - 年份
 * @param {number} month - 月份
 * @returns {Promise}
 */
function getCalendarDates(year, month) {
  return request({
    url: `/plans/calendar?year=${year}&month=${month}`,
    method: 'get'
  });
}


/**
 * 删除餐单计划
 * @param {number} planId - 餐单计划ID
 * @returns {Promise}
 */
function deleteMealPlan(planId) {
  return request({
    url: `/plans/mealPlans/${planId}`,
    method: 'delete'
  });
}

/**
 * 创建新的餐单计划
 * @param {Object} planData - 餐单计划数据
 * @param {string} planData.date - 日期，格式YYYY-MM-DD
 * @param {string} planData.mealType - 餐段类型(breakfast/lunch/dinner)
 * @param {string} planData.recipeId - 菜谱ID
 * @param {string} [planData.notes] - 备注信息（可选）
 * @returns {Promise}
 */
function createMealPlan(planData) {
  return request({
    url: '/plans/createPlans',
    method: 'post',
    data: planData
  });
}

/**
 * 获取指定日期的 meal plans
 * @param {string} dateStr - 日期字符串，格式为YYYY-MM-DD，作为URL路径参数
 * @returns {Promise} - 返回包含meal plans的Promise对象
 */
function getMealPlans(dateStr) {
  return request({
    url: `/plans/listPlans/${dateStr}`,
    method: 'get'
  });
}

/**
 * 更新指定日期的餐食计划
 * @param {string} date - 日期，格式YYYY-MM-DD
 * @param {Object} meals - 餐食数据对象
 * @param {Array} meals.breakfast - 早餐菜品列表
 * @param {Array} meals.lunch - 午餐菜品列表
 * @param {Array} meals.dinner - 晚餐菜品列表
 * @returns {Promise}
 */
function updateMealPlan(id, plan) {
  return request({
    url: `/plans/${id}`,
    method: 'put',
    data: plan
  });
}

/**
 * 获取用户的周计划数据
 * @param {string} startDate - 开始日期，格式YYYY-MM-DD
 * @param {string} endDate - 结束日期，格式YYYY-MM-DD
 * @returns {Promise}
 */
// 文档中未定义周计划接口，暂时注释
// export function getWeeklyMealPlan(startDate, endDate) {
//   return request({
//     url: `/plans/weekly?start=${startDate}&end=${endDate}`,
//     method: 'get'
//   });
// }

const planApi = {
  getCalendarDates,
  deleteMealPlan,
  createMealPlan,
  getMealPlans,
  updateMealPlan
};

export default planApi;