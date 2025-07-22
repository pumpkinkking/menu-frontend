<template>
  <view class="meal-plan-popup" v-if="show">
    <!-- 遮罩层 -->
    <view class="mask" @click="handleClose"></view>
    
    <!-- 弹窗内容 -->
    <view class="popup-content">
      <!-- 头部 -->
      <view class="popup-header">
        <text class="popup-title">{{ currentEditingPlan ? '编辑餐单' : '添加餐单' }}</text>
        <image class="close-icon" src="/static/icons/close.svg" @click="handleClose"></image>
      </view>
      
      <!-- 搜索栏 -->
      <view class="search-bar">
        <view class="search-input-wrapper">
          <image class="search-icon" src="/static/icons/search.svg"></image>
          <input type="text" v-model="searchKeyword" placeholder="搜索菜品..." class="search-input" @input="handleSearch"/>
        </view>
      </view>

      <!-- 下部内容区 -->
      <view class="content-container">
        <!-- 左侧分类选择 -->
        <view class="category-list">
          <view class="category-item" v-for="category in categories" :key="category.id" 
            :class="{ 'active': selectedCategoryId === category.id }" @click="handleCategoryChange(category.id)">
            <text class="category-name">{{ category.name }}</text>
          </view>
        </view>

        <!-- 右侧菜品展示 -->
        <view class="dishes-container">
          <view class="dishes-grid">
            <!-- 菜品项 -->
            <view class="dish-item" v-for="dish in filteredDishes" :key="dish.id" @click="handleDishSelect(dish)">
              <image class="dish-image" :src="dish.image" mode="aspectFill"></image>
              <view class="dish-info">
                <text class="dish-name">{{ dish.name }}</text>
                <view class="dish-meta">
                  <text class="dish-calories">{{ dish.calories }} 千卡</text>
                  <text class="dish-price">¥{{ dish.price.toFixed(2) }}</text>
                </view>
              </view>
            </view>

            <!-- 空状态 -->
            <view class="empty-state" v-if="filteredDishes.length === 0">
              <image src="/static/icons/empty.svg" class="empty-icon"></image>
              <text class="empty-text">没有找到相关菜品</text>
            </view>
          </view>
        </view>
      </view>
      
      <!-- 底部按钮 -->
      <view class="popup-footer">
        <button class="cancel-btn" @click="handleClose">取消</button>
        <button class="confirm-btn" @click="handleConfirm" :loading="submitting">{{ currentEditingPlan ? '更新' : '添加' }}</button>
      </view>
    </view>
  </view>
</template>

<script>
// 假设从API获取菜谱列表，这里使用模拟数据
// 分类数据
const categories = [
  { id: 'all', name: '全部菜品' },
  { id: 'breakfast', name: '早餐' },
  { id: 'lunch', name: '午餐' },
  { id: 'dinner', name: '晚餐' },
  { id: 'snack', name: '小吃' },
  { id: 'dessert', name: '甜点' }
];

// 菜品数据
const dishes = [
  { id: 1, name: '全麦面包配牛奶', image: '/static/images/recipe1.jpg', calories: 320, price: 8.50, category: 'breakfast' },
  { id: 2, name: '蔬菜沙拉', image: '/static/images/recipe2.jpg', calories: 180, price: 12.00, category: 'lunch' },
  { id: 3, name: '清蒸鱼', image: '/static/images/recipe3.jpg', calories: 280, price: 38.00, category: 'dinner' },
  { id: 4, name: '燕麦粥', image: '/static/images/recipe4.jpg', calories: 210, price: 6.00, category: 'breakfast' },
  { id: 5, name: '红烧肉', image: '/static/images/recipe5.jpg', calories: 420, price: 45.00, category: 'dinner' },
  { id: 6, name: '水果拼盘', image: '/static/images/recipe6.jpg', calories: 150, price: 15.00, category: 'dessert' },
  { id: 7, name: '三明治', image: '/static/images/recipe7.jpg', calories: 380, price: 10.00, category: 'breakfast' },
  { id: 8, name: '牛肉面', image: '/static/images/recipe8.jpg', calories: 450, price: 22.00, category: 'lunch' },
  { id: 9, name: '烤鸡翅', image: '/static/images/recipe9.jpg', calories: 320, price: 28.00, category: 'snack' },
  { id: 10, name: '冰淇淋', image: '/static/images/recipe10.jpg', calories: 280, price: 18.00, category: 'dessert' }
];

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    mealType: {
      type: String,
      required: true,
      validator: value => ['breakfast', 'lunch', 'dinner'].includes(value)
    },
    selectedDate: {
      type: Date,
      required: true
    },
    currentEditingPlan: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // 搜索相关
      searchKeyword: '',
      selectedCategoryId: 'all',
      categories: categories,
      dishes: dishes,
      selectedDish: null,
      notes: ''
    };
  },
  computed: {
    /**
     * 根据选中分类和搜索关键词过滤菜品
     */
    filteredDishes() {
      return this.dishes.filter(dish => {
        // 分类过滤
        const categoryMatch = this.selectedCategoryId === 'all' || dish.category === this.selectedCategoryId;
        // 搜索关键词过滤
        const keywordMatch = this.searchKeyword.trim() === '' || 
          dish.name.toLowerCase().includes(this.searchKeyword.toLowerCase());
        return categoryMatch && keywordMatch;
      });
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.initPopup();
      }
    },
    currentEditingPlan(val) {
      if (val && this.show) {
        this.initEditData();
      }
    }
  },
  methods: {
    /**
     * 初始化弹窗数据
     */
    initPopup() {
      // 重置状态
      this.searchKeyword = '';
      this.selectedCategoryId = 'all';
      this.selectedDish = this.currentEditingPlan ? this.dishes.find(d => d.id === this.currentEditingPlan.recipeId) : null;
      this.notes = this.currentEditingPlan ? this.currentEditingPlan.notes || '' : '';
    },
    
    /**
     * 处理搜索输入
     */
    handleSearch() {
      // 搜索逻辑由computed属性filteredDishes自动处理
    },
    
    /**
     * 处理分类切换
     */
    handleCategoryChange(categoryId) {
      this.selectedCategoryId = categoryId;
      // 回到顶部
      uni.pageScrollTo({ scrollTop: 0, duration: 300 });
    },
    
    /**
     * 处理菜品选择
     */
    handleDishSelect(dish) {
      this.selectedDish = dish;
    },
    
    /**
     * 重置表单
     */
    resetForm() {
      this.searchKeyword = '';
      this.selectedCategoryId = 'all';
      this.selectedDish = null;
      this.notes = '';
    },
    
    /**
     * 处理关闭弹窗
     */
    handleClose() {
      this.$emit('close');
    },
    
    /**
     * 处理确认提交
     */
    handleConfirm() {
      // 表单验证
      if (!this.selectedDish) {
        uni.showToast({ title: '请选择菜品', icon: 'error' });
        return;
      }
      
      // 准备提交数据
      const formData = {
        recipeId: this.selectedDish.id,
        recipe: this.selectedDish,
        notes: this.notes
      };
      
      // 如果是编辑模式，添加id
      if (this.currentEditingPlan) {
        formData.id = this.currentEditingPlan.id;
      }
      
      // 提交数据
      this.submitting = true;
      // 模拟API提交
      setTimeout(() => {
        this.$emit('confirm', formData);
        this.submitting = false;
      }, 800);
    }
  }
};
</script>

<style scoped>
/* 遮罩层 */
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* 弹窗内容 */
.popup-content {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60vh;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  z-index: 1000;
  padding-bottom: 20px;
}

/* 弹窗头部 */
.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.popup-title {
  font-size: 	18px;
  font-weight: bold;
  color: #333;
}

.close-icon {
  width: 24px;
  height: 24px;
}

/* 弹窗主体 */
.search-bar {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 0 12px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 15px;
  color: #333;
}

.content-container {
  display: flex;
  height: calc(100% - 160px);
  overflow: hidden;
}

/* 左侧分类列表 */
.category-list {
  width: 25%;
  background-color: #fafafa;
  overflow-y: auto;
}

.category-item {
  padding: 16px;
  text-align: center;
  border-left: 3px solid transparent;
}

.category-item.active {
  background-color: #fff;
  border-left-color: #ff6b6b;
}

.category-name {
  font-size: 14px;
  color: #333;
}

/* 右侧菜品展示 */
.dishes-container {
  width: 75%;
  padding: 16px;
  overflow-y: auto;
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.dish-item {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dish-image {
  width: 100%;
  height: 120px;
}

.dish-info {
  padding: 12px;
}

.dish-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dish-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.dish-calories {
  color: #ff6b6b;
}

.dish-price {
  color: #333;
  font-weight: 500;
}

/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.empty-icon {
  width: 60px;
  height: 60px;
  color: #ccc;
  margin-bottom: 12px;
}

.empty-text {
  color: #999;
  font-size: 14px;
}

/* 弹窗底部按钮 */
.popup-footer {
  display: flex;
  padding: 0 16px;
  gap: 10px;
}

.cancel-btn,
.confirm-btn {
  flex: 1;
  height: 44px;
  border-radius: 22px;
  font-size: 16px;
  font-weight: 500;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: none;
}

.confirm-btn {
  background-color: #ff6b6b;
  color: #fff;
  border: none;
}
</style>