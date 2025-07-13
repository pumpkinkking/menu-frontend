module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  
  devServer: {
    server: {
      type: 'https', // 启用 HTTPS
    },
    port: 8080,
    hot: true, // 热更新
    open: true, // 自动打开浏览器
    client: {
      overlay: {
        warnings: false,
        errors: true, // 错误覆盖提示
      },
    },
    proxy: {
      // 代理 API 请求到后端服务器
      '/api': {
        target: 'http://106.52.97.177:8090',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },

};