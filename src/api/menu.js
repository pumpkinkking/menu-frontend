import api from './axios';

/**
 * 上传新菜单
 * @param {Object} menuData - 菜单数据，需符合MenuDTO格式
 * @returns {Promise<ResultLong>} - 包含新菜单ID的响应结果
 */
export const uploadMenu = async (menuData) => {
  return await api.post('/menus', menuData);
};

/**
 * 获取菜单详情
 * @param {number} id - 菜单ID
 * @returns {Promise<ResultMenuDetailVO>} - 包含菜单详情的响应结果
 */
export const getMenuDetail = async (id) => {
  return await api.get(`/menus/${id}`);
};

/**
 * 搜索菜单
 * @param {string} keyword - 搜索关键词
 * @param {number} [pageNum=1] - 页码
 * @param {number} [pageSize=10] - 每页条数
 * @returns {Promise<ResultIPageMenuVO>} - 包含分页菜单列表的响应结果
 */
export const searchMenus = async (keyword, pageNum = 1, pageSize = 10) => {
  return await api.get('/menus/search', {
    params: { keyword, pageNum, pageSize }
  });
};

/**
 * 收藏菜单
 * @param {number} id - 菜单ID
 * @returns {Promise<ResultBoolean>} - 包含收藏状态的响应结果
 */
export const collectMenu = async (id) => {
  return await api.post(`/menus/${id}/collect`);
};

/**
 * 取消收藏菜单
 * @param {number} id - 菜单ID
 * @returns {Promise<ResultBoolean>} - 包含取消收藏状态的响应结果
 */
export const cancelCollectMenu = async (id) => {
  return await api.delete(`/menus/${id}/collect`);
};

/**
 * 初始化菜单图片上传
 * @param {number} userId - 用户ID
 * @param {string} fileName - 文件名
 * @returns {Promise<ResultString>} - 包含上传ID的响应结果
 */
export const initializeMenuImageUpload = async (userId, fileName) => {
  return await api.post('/menus/image/initialize', null, {
    params: { userId, fileName }
  });
};

/**
 * 上传菜单图片分片
 * @param {string} uploadId - 上传ID
 * @param {number} chunkNumber - 分片序号
 * @param {File} chunkFile - 分片文件
 * @returns {Promise<ResultVoid>} - 上传结果
 */
export const uploadMenuImageChunk = async (uploadId, chunkNumber, chunkFile) => {
  const formData = new FormData();
  formData.append('chunkFile', chunkFile);
  return await api.post('/menus/image/chunk', formData, {
    params: { uploadId, chunkNumber },
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

/**
 * 完成菜单图片上传
 * @param {string} uploadId - 上传ID
 * @param {number} [thumbnailWidth=200] - 缩略图宽度
 * @param {number} [thumbnailHeight=200] - 缩略图高度
 * @returns {Promise<ResultMapStringString>} - 包含图片URL的响应结果
 */
export const completeMenuImageUpload = async (uploadId, thumbnailWidth = 200, thumbnailHeight = 200) => {
  return await api.post('/menus/image/complete', null, {
    params: { uploadId, thumbnailWidth, thumbnailHeight }
  });
};