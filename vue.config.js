const path = require('path');

module.exports = {
  // 项目部署基础路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 输出文件目录
  outputDir: 'dist',

  // 静态资源目录(js, css, img, fonts)
  assetsDir: 'static',

  // 是否在保存的时候使用 `eslint-loader` 进行检查
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 开发服务器配置
    devServer: {
      // 端口号
      port: 8080,
      // 自动打开浏览器
      open: true,
      // 代理配置
      proxy: {
        '/api': {
          target: 'http://106.52.97.177:8090',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      }
    },

  // webpack配置
  configureWebpack: {
    // 解析路径
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    // 开发环境配置
    devtool: process.env.NODE_ENV === 'development' ? 'eval-cheap-module-source-map' : 'source-map'
  },

  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        // 全局引入变量和mixin
        additionalData: `@import "@/uni.css";`
      }
    }
  },

  // 插件配置
  pluginOptions: {
    // 可以在这里配置其他插件
  }
};