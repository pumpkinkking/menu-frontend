import { plans } from '../../mock/data';

Page({
  data: {
    plans: []
  },
  onLoad() {
    // 从mock数据加载计划
    this.setData({ plans });
  },
  createNewPlan() {
    wx.navigateTo({ url: '/src/pages/plan/edit-plan' });
  },
  editPlan(e) {
    const planId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/src/pages/plan/edit-plan?id=${planId}`
    });
  },
  deletePlan(e) {
    const planId = e.currentTarget.dataset.id;
    const plans = this.data.plans.filter(plan => plan.id !== planId);
    this.setData({ plans });
    wx.setStorageSync('mealPlans', plans);
    wx.showToast({ title: '计划已删除', icon: 'none' });
  }
})