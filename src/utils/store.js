const store = {
  /**
   * 全局状态对象
   */
  state: {},

  /**
   * 设置状态并持久化到本地存储
   * @param {string} key - 状态键名
   * @param {any} value - 状态值
   */
  setData(key, value) {
    this.state[key] = value;
    try {
      wx.setStorageSync(key, value);
    } catch (e) {
      console.error('存储失败:', e);
    }
  },

  /**
   * 获取状态（优先内存，其次本地存储）
   * @param {string} key - 状态键名
   * @returns {any} 状态值
   */
  getData(key) {
    if (this.state[key] !== undefined) {
      return this.state[key];
    }
    try {
      const value = wx.getStorageSync(key);
      if (value !== '') {
        this.state[key] = value;
        return value;
      }
    } catch (e) {
      console.error('获取存储失败:', e);
    }
    return null;
  },

  /**
   * 清除指定状态
   * @param {string} key - 状态键名
   */
  removeData(key) {
    delete this.state[key];
    try {
      wx.removeStorageSync(key);
    } catch (e) {
      console.error('删除存储失败:', e);
    }
  },

  /**
   * 清除所有状态
   */
  clearData() {
    this.state = {};
    try {
      wx.clearStorageSync();
    } catch (e) {
      console.error('清除所有存储失败:', e);
    }
  }
};

module.exports = store;