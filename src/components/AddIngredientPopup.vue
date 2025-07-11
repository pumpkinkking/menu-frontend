<template>
  <uni-popup ref="addIngredientPopup" type="center" :mask-click="false">
    <view class="add-ingredient-popup">
      <view class="popup-title">添加食材到菜篮子</view>
      <view class="form-group">
        <text class="form-label">食材名称*</text>
        <input v-model="ingredient.name" type="text" class="form-input" placeholder="请输入食材名称" />
      </view>
      <view class="form-row">
        <view class="form-group half">
          <text class="form-label">数量*</text>
          <input v-model.number="ingredient.quantity" type="number" class="form-input" min="1" placeholder="请输入数量" />
        </view>
        <view class="form-group half">
          <text class="form-label">单位*</text>
          <input v-model="ingredient.unit" type="text" class="form-input" placeholder="个/份/克等" />
        </view>
      </view>
      <view class="button-group">
        <button class="cancel-btn" @click="close">取消</button>
        <button class="confirm-btn" @click="handleConfirm">确认添加</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
/**
 * 食材添加弹窗组件
 * 用于在菜篮子页面中添加新食材
 */
export default {
  name: 'AddIngredientPopup',
  props: {
    /** 是否显示弹窗 */
    showDialog: {
      type: Boolean,
      required: true,
      default: false
    },
    /** 初始食材数据 */
    initialIngredient: {
      type: Object,
      default: () => ({
        name: '',
        quantity: 1,
        unit: '份'
      })
    }
  },
  data() {
    return {
      /** 食材对象 */
      ingredient: { ...this.initialIngredient }
    };
  },
  watch: {
    /** 监听初始食材数据变化，更新本地食材对象 */
    initialIngredient: {
      handler(newVal) {
        this.ingredient = { ...newVal };
      },
      deep: true
    },
    /** 监听弹窗显示状态，重置食材对象 */
    showDialog(newVal) {
      if (newVal) {
        this.ingredient = { ...this.initialIngredient };
      }
    }
  },
  methods: {
    close(){
      this.$refs.addIngredientPopup.close();
    },
    open(){
      this.$refs.addIngredientPopup.open();
    },
    /**
     * 处理取消按钮点击事件
     * 关闭弹窗并通知父组件
     */
    handleCancel() {
      this.$emit('cancel');
    },
    /**
     * 处理确认按钮点击事件
     * 验证食材数据并通知父组件添加食材
     */
    handleConfirm() {
      if (!this.ingredient.name.trim()) {
        uni.showToast({ title: '请输入食材名称', icon: 'none' });
        return;
      }
      this.$emit('confirm', { ...this.ingredient });
    }
  }
};
</script>

<style scoped>
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
</style>