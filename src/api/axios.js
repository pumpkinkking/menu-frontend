import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'http://106.52.97.177:8090', // 根据环境切换API地址
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
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
    if (res.code !== 200) {
      uni.showToast({ title: res.message || '操作失败', icon: 'none' });
      return Promise.reject(res);
    }
    return res.data; // 返回业务数据部分
  },
  error => {
    uni.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
    return Promise.reject(error);
  }
);

export default api;