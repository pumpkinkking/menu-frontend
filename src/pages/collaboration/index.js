Page({
  data: {
    // 页面数据
  },
  methods: {
    createNewProject() {
      // 新建协作项目逻辑
      wx.navigateTo({
        url: '/pages/collaboration/new-project'
      });
    }
  }
})