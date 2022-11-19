const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 全局变量路径
        path.resolve(__dirname, './public/global.less')
      ]
    }
  },
  publicPath: './'

  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost:3000'
  //       // pathRewrite: { '^/api': '/' }
  //     }
  //   }
  // }
})
