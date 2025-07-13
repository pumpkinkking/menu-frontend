<template>
  <view class="basket-popup" v-if="visible">
    <view class="popup-mask" @click="close"></view>
    <view class="popup-content" :class="{ 'visible': visible }"><!-- 添加动态类绑定 -->
      <!-- 切换栏 -->
      <view class="switch-bar">
        <button :class="{ 'active': currentView === 'form' }" @click="switchView('form')">手动添加</button>
        <button :class="{ 'active': currentView === 'menu' }" @click="switchView('menu')">从菜单添加</button>
      </view>

      <!-- 手动添加表单 -->
      <view class="form-container" v-if="currentView === 'form'">
        <form class="basket-form" @submit.prevent="submitForm">
          <!-- 名称（必填） -->
          <view class="form-item">
            <text class="form-label required">名称</text>
            <input type="text" v-model="formData.name" placeholder="请输入食材名称" class="form-input" required/>
          </view>

          <!-- 数量（非必填） -->
          <view class="form-item">
            <text class="form-label">数量</text>
            <input type="number" v-model.number="formData.quantity" placeholder="请输入数量" class="form-input"/>
          </view>

          <!-- 备注（非必填） -->
          <view class="form-item">
            <text class="form-label">备注</text>
            <textarea v-model="formData.notes" placeholder="请输入备注信息" class="form-textarea"></textarea>
          </view>

          <button type="submit" class="submit-btn">添加到菜篮子</button>
        </form>
      </view>

      <!-- 菜单列表视图 -->
      <view class="menu-container" v-if="currentView === 'menu'">
        <view class="search-box">
          <input type="text" v-model="searchKeyword" placeholder="搜索菜单..." class="search-input"/>
        </view>

        <scroll-view class="menu-list" scroll-y="true">
          <view class="menu-item" v-for="menu in filteredMenus" :key="menu.id" @click="selectMenu(menu)">
            <image :src="menu.imageUrl" mode="aspectFit" class="menu-image"></image>
            <view class="menu-info">
              <text class="menu-name">{{ menu.name }}</text>
              <text class="menu-ingredients">{{ menu.ingredients.length }}种食材</text>
            </view>
          </view>
          <view class="empty-tip" v-if="filteredMenus.length === 0">
            未找到相关菜单
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
// 引入mock服务
import { getMenuList } from '@/mock/data.js';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentView: 'form', // form | menu
      formData: {
        name: '',
        quantity: null,
        notes: ''
      },
      searchKeyword: '',
      menus: []
    };
  },
  computed: {
    /**
     * 过滤菜单列表
     */
    filteredMenus() {
      if (!this.searchKeyword) return this.menus;
      return this.menus.filter(menu => 
        menu.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
    }
  },
  watch: {
    /**
     * 监听visible属性，加载菜单数据
     */
    visible(newVal) {
      if (newVal && this.currentView === 'menu') {
        this.loadMenuList();
      }
    },
    /**
     * 切换到菜单视图时加载数据
     */
    currentView(newVal) {
      if (newVal === 'menu') {
        this.loadMenuList();
      }
    }
  },
  methods: {
    /**
     * 切换视图
     */
    switchView(viewType) {
      this.currentView = viewType;
      // 重置表单
      if (viewType === 'form') {
        this.formData = {
          name: '',
          quantity: null,
          notes: ''
        };
      }
    },

    /**
     * 加载菜单列表
     */
    async loadMenuList() {
      try {
        const result = await getMenuList();
        if (result.success) {
          this.menus = result.data;
        }
      } catch (error) {
        console.error('加载菜单列表失败:', error);
        uni.showToast({
          title: '菜单加载失败',
          icon: 'none'
        });
      }
    },

    /**
     * 选择菜单
     */
    selectMenu(menu) {
      // 这里可以根据需求处理选中的菜单
      // 例如：直接添加所有食材或跳转到详情页
      this.$emit('select-menu', menu);
      this.close();
    },

    /**
     * 提交表单
     */
    submitForm() {
      if (!this.formData.name.trim()) {
        uni.showToast({ title: '请输入食材名称', icon: 'none' });
        return;
      }

      // 提交数据
      this.$emit('submit', this.formData);
      // 重置表单
      this.formData = {
        name: '',
        quantity: null,
        notes: ''
      };
      this.close();
    },

    /**
     * 关闭弹窗
     */
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.basket-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.popup-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 750rpx;
  background-color: #fff;
  border-radius: 16px 16px 0 0;
  padding: 20rpx;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  box-sizing: border-box;
}

.popup-content.visible {
  transform: translateY(0);
}

/* 切换栏样式 */
.switch-bar {
  display: flex;
  margin-bottom: 30rpx;
  border-radius: 8rpx;
  overflow: hidden;
  border: 2rpx solid #eee;
}

.switch-bar button {
  flex: 1;
  height: 70rpx;
  background-color: #f5f5f5;
  color: #666;
  font-size: larger;
}

.switch-bar button.active {
  background-color: $uni-color-primary;
  color: #fff;
}

/* 表单样式 */
.form-container {
  padding: 10rpx 0;
}

.form-item {
  margin-bottom: 30rpx;
}

.form-label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
  color: #666;
}

.form-label.required::after {
  content: '*';
  color: #ff4d4f;
  margin-left: 5rpx;
}

.form-input {
  width: 100%;
  padding: 15rpx;
  border: 2rpx solid $uni-bg-color-grey;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.form-textarea {
  width: 100%;
  height: 150rpx;
  padding: 15rpx;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  resize: none;
}

.submit-btn {
  width: 100%;
  height: 80rpx;
  background-color: #007aff;
  color: #fff;
  border-radius: 8rpx;
  font-size: 32rpx;
  margin-top: 20rpx;
}

/* 菜单列表样式 */
.menu-container {
  padding: 10rpx 0;
}

.search-box {
  margin-bottom: 20rpx;
}

.search-input {
  width: 100%;
  height: 60rpx;
  padding: 0 15rpx;
  border: 2rpx solid #ddd;
  border-radius: 30rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.menu-list {
  height: 500rpx;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15rpx 0;
  border-bottom: 2rpx solid $uni-bg-color-grey;
}

.menu-image {
  width: 100rpx;
  height: 100rpx;
  border-radius: 8rpx;
  margin-right: 20rpx;
}

.menu-info {
  flex: 1;
}

.menu-name {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 5rpx;
  display: block;
}

.menu-ingredients {
  font-size: 24rpx;
  color: #ff99b3;
}

.select-icon {
  font-size: 32rpx;
  color: #999;
}

.empty-tip {
  text-align: center;
  padding: 50rpx 0;
  color: #999;
  font-size: 28rpx;
}
</style>