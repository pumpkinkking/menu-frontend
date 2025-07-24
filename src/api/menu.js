import api from './axios';
import qs from 'qs';

// 统一API路径前缀，减少重复书写
const MENU_API_PREFIX = '/menus';

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
    return api.post(`${MENU_API_PREFIX}/upload`, menuData);
  },

  /**
   * 批量上传餐单
   * @param {Array} menuDataList - 餐单数据列表（符合MenuDTO格式）
   * @returns {Promise<Array<number>>} - 新餐单ID列表
   */
  batchUploadMenu: (menuDataList) => {
    return api.post(`${MENU_API_PREFIX}/batchUpload`, menuDataList);
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
    return api.get(`${MENU_API_PREFIX}/category/${categoryId}`, {
        params: { pageNum, pageSize }
      });
  },

  /**
   * 获取菜单详情
   * @param {number} id - 菜单ID
   * @returns {Promise<MenuDetailVO>} - 菜单详情
   */
  getMenuDetail: (id) => {
    return api.get(`${MENU_API_PREFIX}/${id}`);
  },

  /**
   * 按热门程度浏览餐单（分页）
   * @param {Object} [options={}] - 分页参数
   * @param {number} [options.pageNum=1] - 页码
   * @param {number} [options.pageSize=10] - 每页条数
   * @returns {Promise<IPage<MenuVO>>} - 分页菜单列表
   */
  getHotMenus: ({ pageNum = 1, pageSize = 10 } = {}) => {
    return api.get(`${MENU_API_PREFIX}/hot`, {
        params: { pageNum, pageSize }
      });
  },

  /**
   * 按最新上传浏览餐单（分页）
   * @param {Object} [options={}] - 分页参数
   * @param {number} [options.pageNum=1] - 页码
   * @param {number} [options.pageSize=10] - 每页条数
   * @returns {Promise<IPage<MenuVO>>} - 分页菜单列表
   */
  getNewestMenus: ({ pageNum = 1, pageSize = 10 } = {}) => {
    return api.get(`${MENU_API_PREFIX}/newest`, {
        params: { pageNum, pageSize }
      });
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
    return api.get(`${MENU_API_PREFIX}/search`, {
        params: { keyword, pageNum, pageSize }
      });
  },

  /**
   * 收藏菜单
   * @param {number} id - 菜单ID
   * @returns {Promise<boolean>} - 收藏状态（true为成功）
   */
  collectMenu: (id) => {
    return api.post(`${MENU_API_PREFIX}/${id}/collect`);
  },

  /**
   * 取消收藏菜单
   * @param {number} id - 菜单ID
   * @returns {Promise<boolean>} - 取消收藏状态（true为成功）
   */
  cancelCollectMenu: (id) => {
    return api.delete(`${MENU_API_PREFIX}/${id}/collect`);
  },

  /**
   * 图片上传相关接口（聚合为子对象，更清晰）
   */
  imageUpload: {
    /**
     * 初始化菜单图片上传
     * @param {Object} params - 初始化参数
     * @param {string} params.fileName - 文件名（含后缀）
     * @returns {Promise<string>} - 上传ID（用于后续分片上传）
     */
    initialize: () => {
      /**
       * 初始化菜单图片上传
       * @returns {Promise<String>} 上传ID
       */
      return api.post(`${MENU_API_PREFIX}/image/initialize`);
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
        return new Promise((resolve, reject) => {
          // 获取本地存储的token
          const token = uni.getStorageSync('token');
          uni.uploadFile({
            url: `${api.defaults.baseURL}${MENU_API_PREFIX}/image/chunk`,
            filePath: chunkFile,
            name: 'chunkFile',
            method: 'POST',
            header: token ? { 'Authorization': `Bearer ${token}` } : {},
            formData: {
              uploadId: uploadId,
              chunkNumber: chunkNumber
            },
            success: (res) => {
              if (res.statusCode === 200) {
                resolve(JSON.parse(res.data));
              } else {
                reject(new Error(`上传失败: ${res.data}`));
              }
            },
            fail: (err) => {
              reject(new Error(`上传失败: ${err.errMsg}`));
            }
          });
        });
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
      console.log('complete', uploadId, thumbnailWidth, thumbnailHeight);
      if (!uploadId) {
        throw new Error('上传ID不能为空');
      }
      return api.post(`${MENU_API_PREFIX}/image/complete`, qs.stringify({ uploadId, thumbnailWidth, thumbnailHeight }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
    }
  }
};

export default menuService;