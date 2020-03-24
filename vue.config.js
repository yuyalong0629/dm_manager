const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config
      .plugin('ignore')
      .use(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
  },
  // 调试
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#DA5054', // 全局主色
          // 'link-color': '#1890ff', // 链接色
          // 'success-color': '#52c41a', // 成功色
          // 'warning-color': '#faad14', // 警告色
          // 'error-color': '#f5222d', // 错误色
          'font-size-base': '14px' // 主字号
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://192.168.0.107:8089',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
}
