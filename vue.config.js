const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true
  // devServer: {
  //   proxy: {
  //     '/': {
  //       target: 'http://localhost:3000'
  //       // pathRewrite: { '^/api': '/' }
  //     }
  //   }
  // }
})
