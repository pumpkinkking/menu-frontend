<template>
  <view class="plan-page">
    <!-- 日期选择器 -->
    <view class="date-picker-container">
      <picker mode="date" :value="selectedDate" @change="handleDateChange" format="YYYY-MM-DD">
        <view class="date-picker">
          {{ selectedDate }}
          <image src="/static/icon/arrow-down.png" class="arrow-icon"></image>
        </view>
      </picker>
    </view>

    <!-- 餐食列表 -->
    <view class="meal-container">
      <!-- 早餐 -->
      <view class="meal-card">
        <view class="meal-title">早餐</view>
        <view class="meal-content" v-if="meals.breakfast && meals.breakfast.length > 0">
          <view class="dish-item" v-for="dish in meals.breakfast" :key="dish.id">
            <image :src="dish.image" class="dish-img"></image>
            <view class="dish-info">
              <text class="dish-name">{{ dish.name }}</text>
              <text class="dish-desc">{{ dish.description }}</text>
            </view>
          </view>
        </view>
        <view class="empty-tip" v-else>暂无早餐数据</view>
      </view>

      <!-- 午餐 -->
      <view class="meal-card">
        <view class="meal-title">午餐</view>
        <view class="meal-content" v-if="meals.lunch && meals.lunch.length > 0">
          <view class="dish-item" v-for="dish in meals.lunch" :key="dish.id">
            <image :src="dish.image" class="dish-img"></image>
            <view class="dish-info">
              <text class="dish-name">{{ dish.name }}</text>
              <text class="dish-desc">{{ dish.description }}</text>
            </view>
          </view>
        </view>
        <view class="empty-tip" v-else>暂无午餐数据</view>
      </view>

      <!-- 晚餐 -->
      <view class="meal-card">
        <view class="meal-title">晚餐</view>
        <view class="meal-content" v-if="meals.dinner && meals.dinner.length > 0">
          <view class="dish-item" v-for="dish in meals.dinner" :key="dish.id">
            <image :src="dish.image" class="dish-img"></image>
            <view class="dish-info">
              <text class="dish-name">{{ dish.name }}</text>
              <text class="dish-desc">{{ dish.description }}</text>
            </view>
          </view>
        </view>
        <view class="empty-tip" v-else>暂无晚餐数据</view>
      </view>
    </view>
  </view>
</template>

<script>
import * as planApi from '@/api/plan';

export default {
  data() {
    return {
      selectedDate: this.formatDate(new Date()),
      meals: {
        breakfast: [],
        lunch: [],
        dinner: []
      }
    };
  },
  mounted() {
    // 页面加载时查询当天的餐食数据
    this.fetchMealsByDate(this.selectedDate);
  },
  methods: {
    /**
     * 格式化日期为YYYY-MM-DD格式
     */
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    /**
     * 处理日期选择变化
     */
    handleDateChange(e) {
      this.selectedDate = e.detail.value;
      this.fetchMealsByDate(this.selectedDate);
    },

    /**
     * 根据日期查询餐食数据
     */
    fetchMealsByDate(date) {
      planApi.getMealsByDate(date)
        .then(response => {
          this.meals = response.data;
        })
        .catch(error => {
          uni.showToast({ title: '获取餐食数据失败', icon: 'error' });
          console.error('Failed to fetch meals:', error);
        });
    }
  }
};
</script>

<style scoped>
.plan-page {
  padding: 16px;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.date-picker-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.date-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #333;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  margin-left: 8px;
}

.meal-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.meal-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
}

.meal-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.meal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dish-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dish-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.dish-info {
  flex: 1;
}

.dish-name {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  display: block;
}

.dish-desc {
  font-size: 12px;
  color: #666;
}

.empty-tip {
  text-align: center;
  padding: 20px 0;
  color: #999;
  font-size: 14px;
}
</style>