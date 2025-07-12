// 导入模拟数据
import { plans } from '@/mock/data';

Page({
  data: {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    currentDay: new Date().getDate(),
    days: [],
    plans: plans
  },
  onLoad() {
    // 初始化日历
    this.generateCalendar();
  },
  /**
   * 生成日历数据
   */
  generateCalendar() {
    const year = this.data.currentYear;
    const month = this.data.currentMonth;
    const firstDay = new Date(year, month - 1, 1).getDay() || 7; // 获取当月第一天是星期几(转换为周一为1，周日为7)
    const lastDate = new Date(year, month, 0).getDate(); // 获取当月最后一天
    const days = [];

    // 添加月初空白
    for (let i = 1; i < firstDay; i++) {
      days.push({ date: '', month });
    }

    // 添加当月日期
    for (let i = 1; i <= lastDate; i++) {
      days.push({ date: i, month });
    }

    this.setData({ days });
  },
  /**
   * 切换到上个月
   */
  prevMonth() {
    let { currentYear, currentMonth } = this.data;
    currentMonth--;
    if (currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }
    this.setData({ currentYear, currentMonth }, () => {
      this.generateCalendar();
    });
  },
  /**
   * 切换到下个月
   */
  nextMonth() {
    let { currentYear, currentMonth } = this.data;
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
    this.setData({ currentYear, currentMonth }, () => {
      this.generateCalendar();
    });
  },
  /**
   * 添加菜谱到计划
   * @param {Object} e - 事件对象
   */
  addRecipe(e) {
    const mealType = e.currentTarget.dataset.mealType;
    uni.navigateTo({
      url: '/pages/recipe/recipe-list?mealType=' + mealType
    });
  }
});