<template>
  <view class="basket-container">
    <!-- 悬浮添加按钮 -->
    <button class="floating-add-btn" @click="showAddIngredientDialog">+</button>

    <!-- 引入食材弹窗组件 -->
    <add-ingredient-popup
      :ref="addIngredientPopup"
    ></add-ingredient-popup>

    <!-- 菜篮子列表 -->
    <view class="basket-list">
      <view class="section-title">我的购物清单 ({{ basketItems.length }})</view>
      <view v-if="basketItems.length === 0" class="empty-state">
        <image src="/static/images/empty-basket.png" class="empty-icon" />
        <text class="empty-text">购物清单为空</text>
      </view>
      <view class="basket-item" v-for="(item, index) in basketItems" :key="index">
        <view class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-quantity">{{ item.quantity }} {{ item.unit }}</text>
        </view>
        <button @click="removeIngredient(index)" class="remove-btn">删除</button>
      </view>
    </view>

  </view>
</template>

<script>
/**
 * 菜篮子组件 - 用于管理需要购买的食材
 * 功能包括：手动添加食材、从菜品一键添加食材、删除食材
 */
import AddIngredientPopup from '../../../components/AddIngredientPopup.vue';

export default {
  components: {
    AddIngredientPopup
  },
  props: {
    // 从父组件接收菜单数据
    menuItems: { type: Array, required: true },
    // 双向绑定菜篮子数据
    basketItems: { type: Array, required: true }
  },
  data() {
    return {
      // 新食材对象
      newIngredient: {
        name: '',
        quantity: 1,
        unit: '份'
      },
      // 菜品弹窗显示状态
      showDishes: false,
      // 添加食材弹窗显示状态
      showAddDialog: false
    };
  },
  methods: {
    /**
     * 显示添加食材对话框
     */
    showAddIngredientDialog() {
      this.newIngredient = {
        name: '',
        quantity: 1,
        unit: '份'
      };
      this.showAddDialog = true;
    },

    /**
     * 手动添加食材到菜篮子
     */
    /**
     * 处理从弹窗组件确认添加食材
     * @param {Object} ingredient - 从弹窗接收的食材数据
     */
    handleAddIngredient(ingredient) {
      if (!this.newIngredient.name.trim()) {
        uni.showToast({ title: '请输入食材名称', icon: 'none' });
        return;
      }
      
      // 检查是否已存在同名食材
      const existingIndex = this.basketItems.findIndex(
        item => item.name === this.newIngredient.name
      );
      
      if (existingIndex > -1) {
          // 如果已存在，增加数量
          this.basketItems[existingIndex].quantity += ingredient.quantity;
        } else {
          // 如果不存在，添加新食材
          this.basketItems.push({ ...ingredient });
        }
      
      // 重置输入框
      uni.showToast({ title: '添加成功', icon: 'success' });
        this.showAddDialog = false;
    },
    
    /**
     * 从菜篮子中删除食材
     * @param {number} index - 食材索引
     */
    removeIngredient(index) {
      this.basketItems.splice(index, 1);
      uni.showToast({ title: '已删除', icon: 'none' });
    },
    
    /**
     * 显示菜品选择弹窗
     */
    showDishesDialog() {
      this.$refs.dishesPopup.open();
    },
    
    /**
     * 关闭菜品选择弹窗
     */
    closeDishesDialog() {
      this.$refs.dishesPopup.close();
    },
    
    /**
     * 选择菜品并添加其食材到菜篮子
     * @param {Object} dish - 选中的菜品
     */
    selectDish(dish) {
      // 这里简化处理，实际项目中应该有菜品和食材的关联关系
      // 这里假设每个菜品名称就是一种食材
      const ingredientName = dish.name.includes(' ') ? dish.name.split(' ')[1] : dish.name;
      
      this.newIngredient = {
        name: ingredientName,
        quantity: 1,
        unit: '份'
      };
      
      this.addIngredient();
      this.closeDishesDialog();
    }
  }
};
</script>

<style scoped>
.basket-container {
  padding: 16px;
}

.add-ingredient-section {
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  gap: 8px;
  align-items: center;
}

.input-field {
  flex: 1;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
}

.add-btn {
  width: 80px;
  height: 40px;
  background-color: #ff85a2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
}

.basket-list {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

/* 悬浮添加按钮 */
.floating-add-btn {
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ff85a2;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 添加食材弹窗样式 */
.add-ingredient-popup {
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  padding: 20px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.form-input {
  width: 100%;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.half {
  flex: 1;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  height: 44px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #666;
}

.confirm-btn {
  background-color: #ff85a2;
  color: white;
}


.empty-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-text {
  color: #999;
  font-size: 14px;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 8px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 15px;
  color: #333;
}

.item-quantity {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}

.remove-btn {
  width: 60px;
  height: 30px;
  background-color: #f5f5f5;
  color: #ff4d4f;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 13px;
}

.from-dishes-section {
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.select-dish-btn {
  width: 100%;
  height: 44px;
  background-color: #4ecdc4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
}

.dishes-popup {
  padding: 16px;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.popup-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
  color: #333;
}

.dishes-scroll {
  margin-bottom: 16px;
}

.dish-item {
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.dish-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 12px;
}

.dish-info {
  flex: 1;
}

.dish-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
}

.dish-desc {
  font-size: 13px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.close-popup-btn {
  width: 100%;
  height: 44px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  margin-top: 8px;
}
</style>