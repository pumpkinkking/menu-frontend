import request from './axios';

/**
 * 根据日期查询当日三餐数据
 * @param {string} date - 日期，格式YYYY-MM-DD
 * @returns {Promise}
 */
export function getMealPlans() {
  return request({
    url: '/plans/listPlans',
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
export function updateMealPlan(id, plan) {
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