<template>
  <view class="tab-pane">
    <!-- 内容流区域 -->
    <view class="content-area">
      <view class="filter-bar">
        <view class="filter-item" :class="activeFilter === 'recommend' ? 'active' : ''" @click="switchFilter('recommend')">推荐</view>
        <picker class="filter-picker" @change="bindCategoryChange" :value="categoryIndex" :range="categories">
          <view class="filter-item">{{ categories[categoryIndex] }}</view>
        </picker>
        <picker class="filter-picker" @change="bindMealTimeChange" :value="mealTimeIndex" :range="mealTimes">
          <view class="filter-item">{{ mealTimes[mealTimeIndex] }}</view>
        </picker>
        <picker class="filter-picker" @change="bindCuisineChange" :value="cuisineIndex" :range="cuisines">
          <view class="filter-item">{{ cuisines[cuisineIndex] }}</view>
        </picker>
      </view>

      <view class="recipe-list">
        <view class="recipe-card" v-for="recipe in filteredRecipes" :key="recipe.id">
          <image class="recipe-img" :src="recipe.image" mode="aspectFill"></image>
          <view class="recipe-info">
            <text class="recipe-title">{{ recipe.title }}</text>
            <view class="recipe-meta">
              <text class="meta-item">{{ recipe.time }}</text>
              <text class="meta-item">{{ recipe.category }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import menuApi from '@/api/menu';
/**
 * 菜谱广场Tab组件
 * 展示菜谱分类和菜谱列表
 */
export default {
  data() {
    return {
      activeFilter: 'recommend',
      categoryIndex: 0,
      mealTimeIndex: 0,
      cuisineIndex: 0,
      categories: ['品类', '蔬菜', '肉类', '海鲜', '豆制品', '菌菇类', '主食'],
      mealTimes: ['餐时', '早饭', '中饭', '晚饭'],
      cuisines: ['菜系', '鲁菜', '川菜', '粤菜', '苏菜', '闽菜', '浙菜', '湘菜', '徽菜'],
      recipes: []
    };
  },
  computed: {
    /**
     * 根据筛选条件过滤菜谱列表
     * @returns {Array} 过滤后的菜谱数组
     */
    filteredRecipes() {
      if (this.activeFilter === 'recommend') {
        return this.recipes.filter(recipe => recipe.recommend);
      }
      
      let result = [...this.recipes];
      
      // 品类筛选
      if (this.categoryIndex > 0) {
        const category = this.categories[this.categoryIndex];
        result = result.filter(recipe => recipe.category === category);
      }
      
      // 餐时筛选
      if (this.mealTimeIndex > 0) {
        const mealTime = this.mealTimes[this.mealTimeIndex];
        result = result.filter(recipe => recipe.mealTime === mealTime);
      }
      
      // 菜系筛选
      if (this.cuisineIndex > 0) {
        const cuisine = this.cuisines[this.cuisineIndex];
        result = result.filter(recipe => recipe.cuisine === cuisine);
      }
      
      return result;
    }
  },

  mounted() {
    this.loadRecipes();
  },
  methods: {
    /**
     * 加载菜谱数据
     */
    loadRecipes() {
      menuApi.searchMenus()
        .then(response => {
          this.recipes = response.data;
        })
        .catch(error => {
          uni.showToast({ title: '菜谱数据加载失败', icon: 'error' });
          console.error('Failed to load recipes:', error);
        });
    },
    /**
     * 切换筛选类型
     * @param {string} type - 筛选类型(recommend/category/mealTime/cuisine)
     */
    switchFilter(type) {
      this.activeFilter = type;
      // 重置其他筛选器索引
      if (type !== 'category') this.categoryIndex = 0;
      if (type !== 'mealTime') this.mealTimeIndex = 0;
      if (type !== 'cuisine') this.cuisineIndex = 0;
    },
    /**
     * 品类选择变化事件
     * @param {Object} e - 事件对象
     */
    bindCategoryChange(e) {
      this.categoryIndex = e.detail.value;
      this.activeFilter = 'category';
    },
    /**
     * 餐时选择变化事件
     * @param {Object} e - 事件对象
     */
    bindMealTimeChange(e) {
      this.mealTimeIndex = e.detail.value;
      this.activeFilter = 'mealTime';
    },
    /**
     * 菜系选择变化事件
     * @param {Object} e - 事件对象
     */
    bindCuisineChange(e) {
      this.cuisineIndex = e.detail.value;
      this.activeFilter = 'cuisine';
    }
  }
};
</script>

<style scoped>
/* 菜谱广场页面样式 */
.filter-bar {
  display: flex;
  padding: 10px 15px;
  background-color: white;
  border-bottom: 1px solid #f5f5f5;
}

.filter-item {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
  position: relative;
}

.filter-item.active {
  color: #ff85a2;
  font-weight: bold;
}

.filter-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: #ff85a2;
  border-radius: 1px;
}

.filter-picker {
  flex: 1;
}

.filter-picker .filter-item::after {
  content: '▼';
  font-size: 10px;
  margin-left: 5px;
  color: #999;
}

.recipe-list {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  justify-content: space-between;
}

.recipe-card {
  width: 48%;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.recipe-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.recipe-img {
  width: 100%;
  height: 120px;
}

.recipe-info {
  padding: 12px;
}

.recipe-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}
</style>