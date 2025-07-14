<template>
  <view class="tab-pane">
    <view class="content-area">
      <!-- 冰箱食材内容 -->
      <view class="ingredients-list">
        <text class="section-title">冰箱食材</text>
        <!-- 添加食材按钮 -->
        <button class="floating-add-btn" @click="showAddIngredientDialog">+</button>

                <!-- 食材分类标签 -->
        <view class="location-tabs">
          <view class="location-tab" :class="currentLocation === 'all' ? 'active' : ''" @click="currentLocation = 'all'">{{ '全部' }}</view>
          <view class="location-tab" :class="currentLocation === '冷藏' ? 'active' : ''" @click="currentLocation = '冷藏'">{{ '冷藏' }}</view>
          <view class="location-tab" :class="currentLocation === '冷冻' ? 'active' : ''" @click="currentLocation = '冷冻'">{{ '冷冻' }}</view>
          <view class="location-tab" :class="currentLocation === '常温' ? 'active' : ''" @click="currentLocation = '常温'">{{ '常温' }}</view>
        </view>

        <!-- 食材列表 -->
        <AddIngredientForm
          :visible="showAddForm"
          @close="showAddForm = false"
          @submit="handleAddIngredient"
        />
        <view class="ingredient-item" v-for="ingredient in filteredIngredients" :key="ingredient.id">
          <view class="ingredient-info">
            <text class="ingredient-name">{{ ingredient.name }}</text>
            <text class="ingredient-location">{{ ingredient.location }}</text>
          </view>
          <view class="ingredient-meta">
            <text :class="ingredient.quantity <= 5 ? 'low-quantity' : ''">{{ ingredient.quantity }} {{ ingredient.unit }}</text>
            <text :class="freshnessClasses[ingredient.freshness]">{{ ingredient.freshness }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import AddIngredientForm from '@/components/AddIngredientForm.vue';
import ingredientApi from '@/api/ingredient';
/**
 * 冰箱Tab组件
 * 展示冰箱内食材信息，包括存储位置和新鲜状态
 */
export default {
  components: {
    AddIngredientForm
  },

  data() {
    return {
        currentLocation: 'all', // all, 冷藏, 冷冻, 常温
      showAddForm: false,
      newIngredient: {
          name: '',
        category: '',
        productionDate: '',
        shelfLife: '',
        quantity: 1,
        unit: '个',
        location: '冷藏',
        freshness: '新鲜',
        notes: ''
        },
      // 新鲜度样式映射
      freshnessClasses: {
        '新鲜': 'fresh',
        '一般': 'normal',
        '过期': 'expired'
      },
      ingredients: []
      };
  },
  mounted() {
    this.loadIngredients();
  },
  computed: {
    /**
     * 根据选择的存储位置筛选食材
     */
    filteredIngredients() {
      if (this.currentLocation === 'all') {
        return this.ingredients;
      }
      return this.ingredients.filter(ingredient => ingredient.location === this.currentLocation);
    }
  },
  methods: {
    /**
     * 加载食材数据
     */
    loadIngredients() {
      ingredientApi.getIngredients()
        .then(response => {
          this.ingredients = response.data;
        })
        .catch(error => {
          uni.showToast({ title: '食材数据加载失败', icon: 'error' });
          console.error('Failed to load ingredients:', error);
        });
    },
    /**
     * 根据新鲜度获取对应的样式类
     * @param {string} freshness - 新鲜度状态
     * @returns {string} 样式类名
     */
    getFreshnessClass(freshness) {
      switch(freshness) {
        case '新鲜':
          return 'freshness-fresh';
        case '一般':
          return 'freshness-normal';
        case '过期':
          return 'freshness-expired';
        default:
          return '';
      }
    },
    /**
     * 显示添加食材对话框(微信原生)
     */
    // 跳转到添加食材表单页面
    showAddIngredientDialog() {
      this.showAddForm = true;
    },

    /**
     * 处理添加新食材
     */
    handleAddIngredient(newIngredient) {
      // 验证食材数据
      if (!newIngredient.name || !newIngredient.quantity) {
        uni.showToast({ title: '食材信息不完整', icon: 'none' });
        return;
      }

      // 调用API添加食材
      ingredientApi.addIngredient(newIngredient)
        .then(response => {
          uni.showToast({ title: '食材添加成功', icon: 'success' });
          // 通知父组件刷新食材列表
          this.$emit('refresh-ingredients');
          this.showAddForm = false;
        })
        .catch(error => {
          uni.showToast({ title: '食材添加失败', icon: 'error' });
          console.error('Failed to add ingredient:', error);
        });
    },

    // 监听添加食材事件
    onLoad() {
      uni.$on('addIngredient', this.handleAddIngredient);
    },

    // 页面卸载时移除事件监听
    onUnload() {
      uni.$off('addIngredient', this.handleAddIngredient);
    },
    
    /**
     * 弹窗输入食材名称
     */

    /**
     * 提交新食材
     */
    submitIngredient() {
      if (!this.newIngredient.name.trim()) {
        uni.showToast({ title: '请输入食材名称', icon: 'none' });
        return;
      }
      
      // 生成新ID
      const newId = this.ingredients.length > 0 
        ? Math.max(...this.ingredients.map(item => item.id)) + 1 
        : 1;
      
      // 计算过期日期
      const production = new Date(this.newIngredient.productionDate);
      const expiryDate = new Date(production);
      expiryDate.setDate(production.getDate() + this.newIngredient.shelfLife);
      
      const newItem = {
        id: newId,
        expiryDate: expiryDate.toISOString().split('T')[0],
        ...this.newIngredient
      };
      
      // 通知父组件添加新食材
      this.$emit('add-ingredient', newItem);
      
      this.showAddDialog = false;
      uni.showToast({ title: '添加成功', icon: 'success' });
    }
  }
};
</script>

<style scoped>
/* 冰箱页面样式 */
.ingredients-list {
  background-color: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

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

.location-tabs {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  overflow-x: auto;
  padding-bottom: 5px;
}

.location-tab {
  padding: 6px 12px;
  background-color: #f5f5f5;
  border-radius: 16px;
  font-size: 14px;
  white-space: nowrap;
}

.location-tab.active {
  background-color: #ff85a2;
  color: white;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.ingredient-item:last-child {
  border-bottom: none;
}

.ingredient-info {
  flex: 1;
}

.ingredient-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
}

.ingredient-location {
  font-size: 12px;
  color: #888;
}

.ingredient-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ingredient-quantity {
  color: #666;
  font-size: 14px;
}

.low-quantity {
  color: #ff4d4f;
}

/* 新鲜度样式 */
.freshness-fresh {
  color: #52c41a;
  font-size: 12px;
}

.freshness-normal {
  color: #faad14;
  font-size: 12px;
}

.freshness-expired {
  color: #ff4d4f;
  font-size: 12px;
}

</style>