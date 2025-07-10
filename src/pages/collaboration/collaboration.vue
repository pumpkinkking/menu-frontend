<template>
  <view class="collaboration-container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <text class="title">协作中心</text>
      <button class="new-btn" @click="createNewProject">+ 新建协作</button>
    </view>

    <!-- 双栏布局容器 -->
    <view class="layout-container">
      <!-- 左侧项目列表面板 -->
      <view class="left-panel">
        <!-- 标签切换 -->
        <view class="tab-switch">
          <view class="tab-item active">进行中</view>
          <view class="tab-item">已完成</view>
          <view class="tab-item">草稿箱</view>
        </view>

        <!-- 项目列表 -->
        <view class="project-list">
          <view class="project-item active">
            <view class="project-info">
              <text class="project-title">周末晚餐计划</text>
              <text class="project-date">更新于 今天 14:30</text>
            </view>
            <view class="project-status">
              <text class="status-dot"></text>
              <text class="status-text">编辑中</text>
            </view>
          </view>

          <view class="project-item">
            <view class="project-info">
              <text class="project-title">情人节特别餐单</text>
              <text class="project-date">更新于 昨天 20:15</text>
            </view>
            <view class="project-status">
              <text class="status-dot completed"></text>
              <text class="status-text">已完成</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 右侧详情面板 -->
      <view class="right-panel">
        <!-- 餐单标题区 -->
        <view class="menu-header">
          <text class="menu-title">周末晚餐计划</text>
          <view class="editor-status">
            <text class="editor-indicator pink"></text>
            <text class="editor-text">你正在编辑</text>
            <text class="editor-indicator blue"></text>
            <text class="editor-text">Ta 正在查看</text>
          </view>
        </view>

        <!-- 食材清单区域 -->
        <view class="ingredients-section">
          <text class="section-title">食材清单</text>
          <view class="ingredients-list">
            <view class="ingredient-item">
              <checkbox class="checkbox" checked></checkbox>
              <text class="ingredient-name">牛排 500g</text>
              <text class="ingredient-role">采购: 你</text>
            </view>
            <view class="ingredient-item">
              <checkbox class="checkbox"></checkbox>
              <text class="ingredient-name">西兰花 200g</text>
              <text class="ingredient-role">采购: Ta</text>
            </view>
            <view class="ingredient-item">
              <checkbox class="checkbox"></checkbox>
              <text class="ingredient-name">红酒 1瓶</text>
              <text class="ingredient-role">采购: 你</text>
            </view>
          </view>
          <button class="add-ingredient">+ 添加食材</button>
        </view>

        <!-- 烹饪步骤区域 -->
        <view class="steps-section">
          <text class="section-title">烹饪步骤</text>
          <view class="steps-list">
            <view class="step-item">
              <view class="step-number pink">1</view>
              <view class="step-content">
                <text class="step-text">牛排室温解冻，用厨房纸吸干表面水分</text>
                <text class="step-role">烹饪: 你</text>
              </view>
            </view>
            <view class="step-item">
              <view class="step-number blue">2</view>
              <view class="step-content">
                <text class="step-text">西兰花切小朵，焯水1分钟后捞出备用</text>
                <text class="step-role">清洗: Ta</text>
              </view>
            </view>
          </view>
          <button class="add-step">+ 添加步骤</button>
        </view>
      </view>
    </view>

    <!-- 底部工具栏 -->
    <view class="toolbar">
      <button class="tool-btn voice-btn"></button>
      <button class="tool-btn emoji-btn"></button>
      <button class="tool-btn save-btn">保存</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 页面数据
    };
  },
  methods: {
    createNewProject() {
      // 新建协作项目逻辑
      uni.navigateTo({
        url: '/pages/collaboration/new-project'
      });
    }
  }
};
</script>

<style scoped>
/* 基础样式 */
.collaboration-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

/* 导航栏样式 */
.navbar {
  height: 44px;
  background-color: #ff6b6b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
}

.title {
  color: white;
  font-size: 18px;
  font-weight: bold;
}

.new-btn {
  background-color: white;
  color: #ff6b6b;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 14px;
  border: none;
}

/* 双栏布局 */
.layout-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.left-panel {
  width: 35%;
  background-color: white;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.right-panel {
  width: 65%;
  padding: 16px;
  overflow-y: auto;
}

/* 标签切换 */
.tab-switch {
  display: flex;
  height: 40px;
  border-bottom: 1px solid #eee;
}

.tab-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #999;
  position: relative;
}

.tab-item.active {
  color: #ff6b6b;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #ff6b6b;
}

/* 项目列表 */
.project-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.project-item {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  background-color: #f9f9f9;
}

.project-item.active {
  background-color: #fff0f0;
  border-left: 3px solid #ff6b6b;
}

.project-title {
  font-size: 16px;
  color: #333;
  display: block;
  margin-bottom: 4px;
}

.project-date {
  font-size: 12px;
  color: #999;
}

.project-status {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #4ecdc4;
  margin-right: 4px;
}

.status-dot.completed {
  background-color: #999;
}

.status-text {
  font-size: 12px;
  color: #666;
}

/* 餐单标题区 */
.menu-header {
  margin-bottom: 20px;
}

.menu-title {
  font-size: 22px;
  color: #333;
  font-weight: bold;
}

.editor-status {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.editor-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
  margin-left: 10px;
}

.editor-indicator.pink {
  background-color: #ff6b6b;
}

.editor-indicator.blue {
  background-color: #4ecdc4;
}

.editor-text {
  font-size: 14px;
  color: #666;
}

/* 食材清单区域 */
.ingredients-section {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}

.ingredients-list {
  margin-bottom: 12px;
}

.ingredient-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.checkbox {
  transform: scale(1.2);
  margin-right: 12px;
}

.ingredient-name {
  flex: 1;
  font-size: 15px;
  color: #333;
}

.ingredient-role {
  font-size: 12px;
  color: #999;
  background-color: #f5f5f5;
  padding: 2px 8px;
  border-radius: 10px;
}

.add-ingredient {
  width: 100%;
  height: 36px;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 18px;
  border: none;
  font-size: 14px;
}

/* 烹饪步骤区域 */
.steps-section {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
}

.steps-list {
  margin-bottom: 12px;
}

.step-item {
  display: flex;
  margin-bottom: 16px;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

.step-number.pink {
  background-color: #ff6b6b;
}

.step-number.blue {
  background-color: #4ecdc4;
}

.step-content {
  flex: 1;
}

.step-text {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
}

.step-role {
  display: inline-block;
  font-size: 12px;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  margin-top: 4px;
}

.step-role[pink] {
  background-color: #ff6b6b;
}

.step-role[blue] {
  background-color: #4ecdc4;
}

.add-step {
  width: 100%;
  height: 36px;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 18px;
  border: none;
  font-size: 14px;
}

/* 底部工具栏 */
.toolbar {
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
}

.tool-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.voice-btn {
  background-color: #f5f5f5;
}

.emoji-btn {
  background-color: #f5f5f5;
}

.save-btn {
  background-color: #ff6b6b;
  color: white;
  width: 80px;
}
</style>