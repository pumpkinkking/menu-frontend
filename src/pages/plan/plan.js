Page({
  data: {
    selectedDate: '',
    minDate: new Date('2025-01-01').getTime(),
    maxDate: new Date('2025-12-31').getTime()
  },
  formatter(day) {
    const { thirtyDaysAgo } = this.data;
    const date = day.date;
    const month = date.getMonth() + 1;
    const dayDate = date.getDate();
    const currentDate = this.data.currentDate;
    const isCurrent = month === currentDate.getMonth() + 1 && dayDate === currentDate.getDate();
    const isOtherMonth = month !== currentDate.getMonth() + 1;
    const isBeforeThirtyDays = date < thirtyDaysAgo;

    return {
      className: isCurrent ? 'current-day' : isOtherMonth ? 'other-month' : '',
      text: dayDate,
      disabled: isBeforeThirtyDays // 禁用30天前的日期
    };
  },
  titleFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}年 ${month}月`;
  },
  onLoad() {
     
    },
  onClickRight() {
    // 右上角图标点击事件
  },
  onConfirm(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  addRecipe(e) {
    const mealType = e.currentTarget.dataset.type;
    const mealName = mealType === 'breakfast' ? '早餐' : mealType === 'lunch' ? '午餐' : '晚餐';
    wx.showToast({
      title: `添加${mealName}菜谱`,
      icon: 'none'
    });
  }
});