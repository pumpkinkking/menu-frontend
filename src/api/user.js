import request from './axios';

/**
 * 用户相关API接口封装
 */
const userApi = {
  /**
   * 微信登录
   * @param {string} code - 微信登录code
   * @returns {Promise<{token: string, userId: number}>}
   */
  wechatLogin: (code) => {
    return request.post('/user/wechatLogin', null, {
      params: { code }
    });
  },

  /**
   * 手机号登录
   * @param {Object} params - 登录参数
   * @param {string} params.encryptedData - 加密数据
   * @param {string} params.iv - 加密向量
   * @param {number} params.userId - 用户ID
   * @returns {Promise<{token: string, userId: number}>}
   */
  phoneLogin: (params) => {
    return request.post('/user/phoneLogin', null, {
      params
    });
  },

  /**
   * 更新用户名
   * @param {number} userId - 用户ID
   * @param {string} username - 新用户名
   * @returns {Promise<boolean>}
   */
  updateUsername: (userId, username) => {
    return request.post('/user/updateUsername', null, {
      params: { userId, username }
    });
  },

  /**
   * 初始化头像上传
   * @param {number} userId - 用户ID
   * @param {string} fileName - 文件名
   * @returns {Promise<string>} - 上传ID
   */
  initializeAvatarUpload: (userId, fileName) => {
    return request.post('/user/avatar/initialize', null, {
      params: { userId, fileName }
    });
  },

  /**
   * 上传头像分片
   * @param {string} uploadId - 上传ID
   * @param {number} chunkNumber - 分片序号
   * @param {File} chunkFile - 分片文件
   * @returns {Promise}
   */
  uploadAvatarChunk: (uploadId, chunkNumber, chunkFile) => {
    const formData = new FormData();
    formData.append('chunkFile', chunkFile);
    return request.post('/user/avatar/chunk', formData, {
      params: { uploadId, chunkNumber },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * 完成头像上传
   * @param {string} uploadId - 上传ID
   * @returns {Promise<string>} - 头像URL
   */
  completeAvatarUpload: (uploadId) => {
    return request.post('/user/avatar/complete', null, {
      params: { uploadId }
    });
  }
};

export default userApi;