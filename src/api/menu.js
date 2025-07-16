import api from './axios';

// 统一API路径前缀，减少重复书写
const MENU_API_PREFIX = '/menus';

/**
 * 统一响应处理（成功/错误拦截）
 * @param {Promise} requestPromise - axios请求Promise
 * @returns {Promise} - 处理后的响应数据（仅返回业务数据）
 */
const handleResponse = async (requestPromise) => {
  try {
    const response = await requestPromise;
    // 假设后端响应格式为 { code: 200, data: ..., message: '' }
    if (response.data?.code === 200) {
      return response.data.data; // 只返回业务数据，简化调用处处理
    }
    // 非200状态码视为业务错误（如参数错误、权限问题）
    const errorMsg = response.data?.message || '请求失败，请重试';
    console.error(`API错误: ${errorMsg}`);
    throw new Error(errorMsg);
  } catch (error) {
    // 网络错误或其他异常
    const errorMsg = error.message || '网络异常，请检查连接';
    console.error(`请求异常: ${errorMsg}`);
    throw new Error(errorMsg); // 抛出自定义错误，让调用处可捕获
  }
};

/**
 * 菜单相关API接口封装
 */
export const menuService = {
  /**
   * 上传新菜单
   * @param {Object} menuData - 菜单数据（符合MenuDTO格式）
   * @returns {Promise<number>} - 新菜单ID
   */
  uploadMenu: (menuData) => {
    return handleResponse(api.post(MENU_API_PREFIX, menuData));
  },

  /**
   * 批量上传餐单
   * @param {Array} menuDataList - 餐单数据列表（符合MenuDTO格式）
   * @returns {Promise<Array<number>>} - 新餐单ID列表
   */
  batchUploadMenu: (menuDataList) => {
    return handleResponse(api.post(`${MENU_API_PREFIX}/batch`, menuDataList));
  },

  /**
   * 按分类浏览餐单（分页）
   * @param {Object} params - 分页及分类参数
   * @param {number} params.categoryId - 分类ID
   * @param {number} [params.pageNum=1] - 页码
   * @param {number} [params.pageSize=10] - 每页条数
   * @returns {Promise<IPage<MenuVO>>} - 分页菜单列表
   */
  getMenusByCategory: ({ categoryId, pageNum = 1, pageSize = 10 }) => {
    return handleResponse(
      api.get(`${MENU_API_PREFIX}/category/${categoryId}`, {
        params: { pageNum, pageSize }
      })
    );
  },

  /**
   * 获取菜单详情
   * @param {number} id - 菜单ID
   * @returns {Promise<MenuDetailVO>} - 菜单详情
   */
  getMenuDetail: (id) => {
    return handleResponse(api.get(`${MENU_API_PREFIX}/${id}`));
  },

  /**
   * 按热门程度浏览餐单（分页）
   * @param {Object} [options={}] - 分页参数
   * @param {number} [options.pageNum=1] - 页码
   * @param {number} [options.pageSize=10] - 每页条数
   * @returns {Promise<IPage<MenuVO>>} - 分页菜单列表
   */
  getHotMenus: ({ pageNum = 1, pageSize = 10 } = {}) => {
    return handleResponse(
      api.get(`${MENU_API_PREFIX}/hot`, {
        params: { pageNum, pageSize }
      })
    );
  },

  /**
   * 按最新上传浏览餐单（分页）
   * @param {Object} [options={}] - 分页参数
   * @param {number} [options.pageNum=1] - 页码
   * @param {number} [options.pageSize=10] - 每页条数
   * @returns {Promise<IPage<MenuVO>>} - 分页菜单列表
   */
  getNewestMenus: ({ pageNum = 1, pageSize = 10 } = {}) => {
    return handleResponse(
      api.get(`${MENU_API_PREFIX}/newest`, {
        params: { pageNum, pageSize }
      })
    );
  },

  /**
   * 搜索菜单（分页）
   * @param {Object} params - 搜索参数
   * @param {string} params.keyword - 搜索关键词
   * @param {number} [params.pageNum=1] - 页码
   * @param {number} [params.pageSize=10] - 每页条数
   * @returns {Promise<IPage<MenuVO>>} - 分页菜单列表
   */
  searchMenus: ({ keyword, pageNum = 1, pageSize = 10 }) => {
    if (!keyword) {
      throw new Error('搜索关键词不能为空'); // 提前校验参数
    }
    return handleResponse(
      api.get(`${MENU_API_PREFIX}/search`, {
        params: { keyword, pageNum, pageSize }
      })
    );
  },

  /**
   * 收藏菜单
   * @param {number} id - 菜单ID
   * @returns {Promise<boolean>} - 收藏状态（true为成功）
   */
  collectMenu: (id) => {
    return handleResponse(api.post(`${MENU_API_PREFIX}/${id}/collect`));
  },

  /**
   * 取消收藏菜单
   * @param {number} id - 菜单ID
   * @returns {Promise<boolean>} - 取消收藏状态（true为成功）
   */
  cancelCollectMenu: (id) => {
    return handleResponse(api.delete(`${MENU_API_PREFIX}/${id}/collect`));
  },

  /**
   * 图片上传相关接口（聚合为子对象，更清晰）
   */
  imageUpload: {
    /**
     * 初始化菜单图片上传
     * @param {Object} params - 初始化参数
     * @param {number} params.userId - 用户ID
     * @param {string} params.fileName - 文件名（含后缀）
     * @returns {Promise<string>} - 上传ID（用于后续分片上传）
     */
    initialize: ({ userId, fileName }) => {
      if (!userId || !fileName) {
        throw new Error('用户ID和文件名不能为空');
      }
      return handleResponse(
        api.post(`${MENU_API_PREFIX}/image/initialize`, null, {
          params: { userId, fileName }
        })
      );
    },

    /**
     * 上传菜单图片分片
     * @param {Object} params - 分片上传参数
     * @param {string} params.uploadId - 初始化返回的上传ID
     * @param {number} params.chunkNumber - 分片序号（从1开始）
     * @param {File} params.chunkFile - 分片文件（File对象）
     * @returns {Promise<void>} - 无返回值（成功即表示分片上传完成）
     */
    uploadChunk: ({ uploadId, chunkNumber, chunkFile }) => {
      if (!uploadId || !chunkNumber || !chunkFile) {
        throw new Error('上传ID、分片序号和文件不能为空');
      }
      const formData = new FormData();
      formData.append('chunkFile', chunkFile);
      return handleResponse(
        api.post(`${MENU_API_PREFIX}/image/chunk`, formData, {
          params: { uploadId, chunkNumber },
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      );
    },

    /**
     * 完成菜单图片上传（合并分片）
     * @param {Object} params - 完成上传参数
     * @param {string} params.uploadId - 上传ID
     * @param {number} [params.thumbnailWidth=200] - 缩略图宽度
     * @param {number} [params.thumbnailHeight=200] - 缩略图高度
     * @returns {Promise<Record<string, string>>} - 图片URL映射（如 { original: '...', thumbnail: '...' }）
     */
    complete: ({ uploadId, thumbnailWidth = 200, thumbnailHeight = 200 }) => {
      if (!uploadId) {
        throw new Error('上传ID不能为空');
      }
      return handleResponse(
        api.post(`${MENU_API_PREFIX}/image/complete`, null, {
          params: { uploadId, thumbnailWidth, thumbnailHeight }
        })
      );
    }
  }
};

export default menuService;