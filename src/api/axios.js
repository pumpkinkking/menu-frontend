import axios from 'axios';

// 微信小程序适配器
const wxAdapter = (config) => {
  return new Promise((resolve, reject) => {
    // 处理URL
    const url = config.baseURL ? config.baseURL + config.url : config.url;
    
    // 处理请求方法，默认GET
    const method = (config.method || 'get').toUpperCase();
    
    // 处理请求头
    const header = { ...config.headers };
    
    // 微信小程序要求Content-Type小写
    if (header['Content-Type']) {
      header['content-type'] = header['Content-Type'];
      delete header['Content-Type'];
    }
    
    wx.request({
      url,
      method,
      data: config.data,
      header,
      timeout: config.timeout,
      success: (response) => {
        resolve({
          data: response.data,
          status: response.statusCode,
          statusText: '',
          headers: response.header,
          config: config,
          request: response
        });
      },
      fail: (error) => {
        reject(new Error(error.errMsg || '请求失败'));
      }
    });
  });
};

// 创建axios实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'http://192.168.250.55:8090' 
    : '', // 根据环境切换API地址
  timeout: 5000, // 请求超时时间
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // },
  // 微信小程序环境使用自定义适配器
  adapter: process.env.UNI_PLATFORM === 'mp-weixin' ? wxAdapter : undefined
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    // 可以在这里添加认证信息，如token
    const token = uni.getStorageSync('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  response => {
    const res = response.data;
    // 先检查响应数据是否存在
    if (res === undefined) {
      uni.showToast({ title: '无效的响应数据', icon: 'none' });
      return Promise.reject(new Error('无效的响应数据'));
    }
    // 灵活处理响应格式：如果有code字段则验证，没有则默认成功
    if (res.code !== undefined && res.code !== 200) {
      uni.showToast({ title: res.message || '操作失败', icon: 'none' });
      return Promise.reject(res);
    }
    // 根据是否有code字段决定返回数据结构
    return res.code !== undefined ? res.data : res;
  },
  error => {
    uni.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
    return Promise.reject(error);
  }
);

export default api;