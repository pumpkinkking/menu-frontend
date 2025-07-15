<template>
  <view class="plan-page">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="nav-title">自定义计划</view>
    </view>

    <!-- 日历组件 -->
    <view class="calendar-container">
      <view class="calendar-header">
        <image class="calendar-arrow" src="/static/icons/left-arrow.svg" @click="prevMonth"></image>
        <view class="calendar-title">{{currentYear}}年 {{currentMonth}}月</view>
        <image class="calendar-arrow" src="/static/icons/right-arrow.svg" @click="nextMonth"></image>
      </view>
      <view class="calendar-weekdays">
        <view class="weekday">周一</view>
        <view class="weekday">周二</view>
        <view class="weekday">周三</view>
        <view class="weekday">周四</view>
        <view class="weekday">周五</view>
        <view class="weekday">周六</view>
        <view class="weekday">周日</view>
      </view>
      <view class="calendar-days">
        <view v-for="(day, index) in days" :key="index" class="calendar-day" :class="{ 'current-day': day === currentDay, 'other-month': day.month !== currentMonth }">
          {{day.date}}
        </view>
      </view>
    </view>

    <!-- 三餐安排区域 -->
    <scroll-view class="meal-scroll" scroll-y>
      <view class="meal-section">
        <view class="meal-header">
          <image class="meal-icon" src="/static/icons/breakfast.svg"></image>
          <text class="meal-title">早餐</text>
          <button class="add-btn" @click="addRecipe('breakfast')">添加菜谱</button>
        </view>
        <view class="meal-content">
          <image class="empty-img" src="/static/images/empty-meal.svg"></image>
          <text class="empty-text">暂无安排~</text>
        </view>
      </view>

      <view class="meal-section">
        <view class="meal-header">
          <image class="meal-icon" src="/static/icons/lunch.svg"></image>
          <text class="meal-title">午餐</text>
          <button class="add-btn" @click="addRecipe('lunch')">添加菜谱</button>
        </view>
        <view class="meal-content">
          <image class="empty-img" src="/static/images/empty-meal.svg"></image>
          <text class="empty-text">暂无安排~</text>
        </view>
      </view>

      <view class="meal-section">
        <view class="meal-header">
          <image class="meal-icon" src="/static/icons/dinner.svg"></image>
          <text class="meal-title">晚餐</text>
          <button class="add-btn" @click="addRecipe('dinner')">添加菜谱</button>
        </view>
        <view class="meal-content">
          <image class="empty-img" src="/static/images/empty-meal.svg"></image>
          <text class="empty-text">暂无安排~</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentYear: 2025,
      currentMonth: 7,
      currentDay: 10,
      days: []
    };
  },
  onLoad() {
    // 初始化日历数据
    this.generateCalendar();
  },
  methods: {
    /**
     * 生成日历数据
     * @description 根据当前年月生成日历网格数据
     */
    generateCalendar() {
      // 实际项目中这里应该根据currentYear和currentMonth生成日期数据
      // 简化实现，直接返回示例数据
      this.days = [
        {date: 30, month: 6}, {date: 1, month: 7}, {date: 2, month: 7}, {date: 3, month: 7}, {date: 4, month: 7}, {date: 5, month: 7}, {date: 6, month: 7},
        {date: 7, month: 7}, {date: 8, month: 7}, {date: 9, month: 7}, {date: 10, month: 7}, {date: 11, month: 7}, {date: 12, month: 7}, {date: 13, month: 7},
        {date: 14, month: 7}, {date: 15, month: 7}, {date: 16, month: 7}, {date: 17, month: 7}, {date: 18, month: 7}, {date: 19, month: 7}, {date: 20, month: 7},
        {date: 21, month: 7}, {date: 22, month: 7}, {date: 23, month: 7}, {date: 24, month: 7}, {date: 25, month: 7}, {date: 26, month: 7}, {date: 27, month: 7},
        {date: 28, month: 7}, {date: 29, month: 7}, {date: 30, month: 7}, {date: 31, month: 7}, {date: 1, month: 8}, {date: 2, month: 8}, {date: 3, month: 8}
      ];
    },
    
    /**
     * 切换到上一个月
     * @description 更新当前年月并重新生成日历
     */
    prevMonth() {
      this.currentMonth--;
      if (this.currentMonth < 1) {
        this.currentMonth = 12;
        this.currentYear--;
      }
      this.generateCalendar();
    },
    
    /**
     * 切换到下一个月
     * @description 更新当前年月并重新生成日历
     */
    nextMonth() {
      this.currentMonth++;
      if (this.currentMonth > 12) {
        this.currentMonth = 1;
        this.currentYear++;
      }
      this.generateCalendar();
    },
    
    /**
     * 添加菜谱
     * @description 打开添加菜谱的模态框或页面
     * @param {string} mealType - 餐段类型(breakfast/lunch/dinner)
     */
    addRecipe(mealType) {
      // 实际项目中这里应该打开添加菜谱的界面
      uni.showToast({
        title: `添加${mealType === 'breakfast' ? '早餐' : mealType === 'lunch' ? '午餐' : '晚餐'}菜谱`,
        icon: 'none'
      });
    }
  }
};
</script>

<style scoped>
.plan-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 10px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

.nav-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.nav-actions {
  display: flex;
  gap: 16px;
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.calendar-container {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 10px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.calendar-arrow {
  width: 20px;
  height: 20px;
}

.calendar-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-size: 12px;
  color: #999;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 14px;
  color: #333;
}

.calendar-day.current-day {
  background-color: #ff6b6b;
  color: #fff;
  font-weight: bold;
}

.calendar-day.other-month {
  color: #ccc;
}

.meal-scroll {
  flex: 1;
  padding-bottom: 50px; /* 为底部Tab栏留出空间 */
}

.meal-section {
  background-color: #fff;
  border-radius: 12px;
  margin: 0 16px 10px;
  padding: 16px;
}

.meal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.meal-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.meal-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
}

.add-btn {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 14px;
}

.meal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
}

.empty-img {
  width: 120px;
  height: 120px;
  margin-bottom: 10px;
}

.empty-text {
  color: #999;
  font-size: 14px;
}
</style>