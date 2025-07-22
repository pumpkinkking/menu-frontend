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
        <view class="calendar-title">{{ currentYear }}年 {{ currentMonth }}月</view>
        <image class="calendar-arrow" src="/static/icons/right-arrow.svg" @click="nextMonth"></image>
      </view>
      <view class="calendar-weekdays">
        <view class="weekday" v-for="(day, index) in weekdays" :key="index">{{ day }}</view>
      </view>
      <view class="calendar-loading" v-if="loading">加载中...</view>
      <view class="calendar-days" v-else>
        <view class="calendar-day"
          v-for="(day, index) in days"
          :key="index"
          :class="{
            'current-day': day === currentDay,
            'other-month': day.month !== currentMonth,
            'selected-day': selectedDate && day.date === selectedDate.getDate() && day.month === selectedDate.getMonth() + 1
          }"
          @click="selectDate(day)">
          {{ day.date }}
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
          <template v-if="mealPlans.breakfast.length > 0">
            <view class="meal-item" v-for="(plan, index) in mealPlans.breakfast" :key="index">
              <image class="recipe-img" :src="plan.recipe.image || '/static/images/default-recipe.png'"></image>
              <view class="recipe-info">
                <text class="recipe-name">{{ plan.recipe.name }}</text>
                <text class="recipe-desc">{{ plan.recipe.description || '无描述' }}</text>
              </view>
              <view class="meal-actions">
                <image class="action-icon" src="/static/icons/edit.svg" @click="editRecipe(plan.id)"></image>
                <image class="action-icon" src="/static/icons/delete.svg" @click="deleteRecipe(plan.id)"></image>
              </view>
            </view>
          </template>
          <template v-else>
            <image class="empty-img" src="/static/images/empty-meal.svg"></image>
            <text class="empty-text">暂无安排~</text>
          </template>
        </view>
      </view>

      <view class="meal-section">
        <view class="meal-header">
          <image class="meal-icon" src="/static/icons/lunch.svg"></image>
          <text class="meal-title">午餐</text>
          <button class="add-btn" @click="addRecipe('lunch')">添加菜谱</button>
        </view>
        <view class="meal-content">
          <template v-if="mealPlans.lunch.length > 0">
            <view class="meal-item" v-for="(plan, index) in mealPlans.lunch" :key="index">
              <image class="recipe-img" :src="plan.recipe.image || '/static/images/default-recipe.png'"></image>
              <view class="recipe-info">
                <text class="recipe-name">{{ plan.recipe.name }}</text>
                <text class="recipe-desc">{{ plan.recipe.description || '无描述' }}</text>
              </view>
              <view class="meal-actions">
                <image class="action-icon" src="/static/icons/edit.svg" @click="editRecipe(plan.id)"></image>
                <image class="action-icon" src="/static/icons/delete.svg" @click="deleteRecipe(plan.id)"></image>
              </view>
            </view>
          </template>
          <template v-else>
            <image class="empty-img" src="/static/images/empty-meal.svg"></image>
            <text class="empty-text">暂无安排~</text>
          </template>
        </view>
      </view>

      <view class="meal-section">
        <view class="meal-header">
          <image class="meal-icon" src="/static/icons/dinner.svg"></image>
          <text class="meal-title">晚餐</text>
          <button class="add-btn" @click="addRecipe('dinner')">添加菜谱</button>
        </view>
        <view class="meal-content">
          <template v-if="mealPlans.dinner.length > 0">
            <view class="meal-item" v-for="(plan, index) in mealPlans.dinner" :key="index">
              <image class="recipe-img" :src="plan.recipe.image || '/static/images/default-recipe.png'"></image>
              <view class="recipe-info">
                <text class="recipe-name">{{ plan.recipe.name }}</text>
                <text class="recipe-desc">{{ plan.recipe.description || '无描述' }}</text>
              </view>
              <view class="meal-actions">
                <image class="action-icon" src="/static/icons/edit.svg" @click="editRecipe(plan.id)"></image>
                <image class="action-icon" src="/static/icons/delete.svg" @click="deleteRecipe(plan.id)"></image>
              </view>
            </view>
          </template>
          <template v-else>
            <image class="empty-img" src="/static/images/empty-meal.svg"></image>
            <text class="empty-text">暂无安排~</text>
          </template>
        </view>
      </view>
    </scroll-view>

    <!-- 添加菜谱弹窗 -->
    <AddMealPlanPopup
      v-if="showAddRecipePopup"
      :show="showAddRecipePopup"
      :meal-type="selectedMealType"
      :selected-date="selectedDate"
      :current-editing-plan="currentEditingPlan"
      @close="showAddRecipePopup = false"
      @confirm="submitMealPlan"
    />
  </view>
</template>

<script>
import planApi from '@/api/plan';
import AddMealPlanPopup from '@/components/AddMealPlanPopup.vue';

export default {
  components: {
    AddMealPlanPopup
  },
  data() {
    return {
      weekdays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      loading: false,
      currentYear: 2025,
      currentMonth: 7,
      currentDay: 10,
      days: [],
      showAddRecipePopup: false,
      selectedMealType: '',
      selectedDate: null,
      currentEditingPlan: null,
      mealPlans: {
        breakfast: [],
        lunch: [],
        dinner: []
      }
    };
  },
  onLoad() {
    // 初始化日历数据
    this.generateCalendar();
  },
  methods: {
    /**
     * 编辑餐单计划
     * @param {number} planId - 餐单计划ID
     */
    editRecipe(planId) {
      // 查找要编辑的计划
      const plan = this.findPlanById(planId);
      if (plan) {
        this.selectedMealType = plan.mealType;
        this.selectedDate = new Date(plan.date);
        // 打开弹窗并传入当前计划数据
        this.showAddRecipePopup = true;
        this.currentEditingPlan = plan;
      }
    },

    /**
     * 删除餐单计划
     * @param {number} planId - 餐单计划ID
     */
    deleteRecipe(planId) {
      uni.showModal({
        title: '确认删除',
        content: '确定要删除这个餐单计划吗？',
        success: async (res) => {
          if (res.confirm) {
            try {
              this.loading = true;
              await planApi.deleteMealPlan(planId);
              uni.showToast({ title: '删除成功', icon: 'success' });
              // 重新加载当前日期的餐单计划
              this.loadMealPlans();
            } catch (error) {
              console.error('删除餐单失败:', error);
              uni.showToast({ title: '删除失败', icon: 'error' });
            } finally {
              this.loading = false;
            }
          }
        }
      });
    },

    /**
     * 根据ID查找餐单计划
     * @param {number} planId - 餐单计划ID
     * @returns {Object|null} 找到的计划对象或null
     */
    findPlanById(planId) {
      for (const type in this.mealPlans) {
        const found = this.mealPlans[type].find(plan => plan.id === planId);
        if (found) return found;
      }
      return null;
    },

    /**
     * 加载选中日期的餐单计划
     * @description 从后端获取指定日期的早中晚餐计划并更新视图
     */
    async loadMealPlans() {
      if (!this.selectedDate) return;

      try {
        this.loading = true;
        const dateStr = this.formatDate(this.selectedDate);
        const response = await planApi.getMealPlans(dateStr);

        // 初始化三餐计划数据
        this.mealPlans = {
          breakfast: [],
          lunch: [],
          dinner: []
        };

        // 将后端返回的数据按餐段分类
        if (response && Array.isArray(response)) {
          response.forEach(plan => {
            if (this.mealPlans[plan.mealType]) {
              this.mealPlans[plan.mealType].push(plan);
            }
          });
        }
      } catch (error) {
        console.error('获取餐单计划失败:', error);
        uni.showToast({ title: '加载计划失败', icon: 'error' });
      } finally {
        this.loading = false;
      }
    },

    /**
     * 选择日期
     * @param {Object} day - 包含date和month的日期对象
     */
    selectDate(day) {
      this.selectedDate = new Date(this.currentYear, day.month - 1, day.date);
      this.loadMealPlans();
    },

    /**
     * 生成日历数据
     * @description 根据当前年月生成日历网格数据
     */
    generateCalendar() {
      this.loading = true;
      // 生成本地完整日历
      const localDays = this.generateLocalCalendar(this.currentYear, this.currentMonth);
      this.days = localDays;
      this.loading = false;
    },

    /**
     * 生成本地日历数据
     * @param {number} year - 年份
     * @param {number} month - 月份(1-12)
     * @returns {Array} 日历日期数组
     */
    generateLocalCalendar(year, month) {
      const days = [];
      // 获取当月第一天
      const firstDay = new Date(year, month - 1, 1);
      // 获取当月最后一天
      const lastDay = new Date(year, month, 0);
      // 获取当月第一天是星期几 (0-6, 0是星期日)
      const firstDayOfWeek = firstDay.getDay() || 7; // 将星期日的0转换为7
      // 获取当月天数
      const daysInMonth = lastDay.getDate();

      // 计算月初前的空白日期数量
      const startBlankDays = firstDayOfWeek - 1;

      // 添加月初前的空白日期（上个月的日期）
      for (let i = 1; i <= startBlankDays; i++) {
        const date = new Date(year, month - 1, 1 - i);
        days.push({
          date: date.getDate(),
          month: date.getMonth() + 1
        });
      }

      // 添加当月日期
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          date: i,
          month: month
        });
      }

      // 计算需要的总显示天数
      const totalDaysNeeded = startBlankDays + daysInMonth;
      // 计算需要的周数
      const weeksNeeded = Math.ceil(totalDaysNeeded / 7);
      // 确定目标周数：5周能覆盖则显示5周，否则显示6周
      const targetWeeks = weeksNeeded <= 5 ? 5 : 6;
      const totalDays = targetWeeks * 7;

      // 添加月末后的空白日期（下个月的日期）
      const remainingDays = totalDays - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({
          date: i,
          month: month + 1
        });
      }

      return days;
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
      this.selectedMealType = mealType;
      // 获取当前选中的日期，如果未选中则使用当天
      this.selectedDate = this.selectedDate || new Date(this.currentYear, this.currentMonth - 1, this.currentDay);
      this.showAddRecipePopup = true;
    },

    /**
     * 提交餐单计划到后端
     * @param {Object} recipeData - 包含菜谱信息的数据对象
     */
    submitMealPlan(recipeData) {
      this.loading = true;
      const planData = {
        date: this.formatDate(this.selectedDate),
        mealType: this.selectedMealType,
        ...recipeData
      };

      planApi.createMealPlan(planData)
        .then(() => {
          uni.showToast({ title: '添加成功', icon: 'success' });
          this.showAddRecipePopup = false;
          // 可以在这里刷新餐单列表
        })
        .catch(error => {
          console.error('添加餐单失败:', error);
          uni.showToast({ title: '添加失败', icon: 'error' });
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * 格式化日期为YYYY-MM-DD格式
     * @param {Date} date - 日期对象
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
  height: 320px; /* 固定日历容器高度 */
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  height: calc(100% - 80px); /* 减去头部和星期行高度，自适应行数 */
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

.calendar-day.selected-day {
  border: 2px solid #ff6b6b;
  color: #ff6b6b;
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
  padding: 10px 0;
}

.meal-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.recipe-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.recipe-info {
  flex: 1;
}

.recipe-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
  display: block;
}

.recipe-desc {
  font-size: 12px;
  color: #999;
}

.meal-actions {
  display: flex;
  gap: 15px;
}

.action-icon {
  width: 20px;
  height: 20px;
  color: #999;
}

.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.empty-img {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.empty-text {
  color: #999;
  font-size: 14px;
}
</style>