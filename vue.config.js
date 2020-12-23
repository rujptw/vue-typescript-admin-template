/*
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-23 15:11:26
 * @FilePath: /vue-typescript-admin-template/vue.config.js
 */
const { resolve } = require('path')
const path = require('path')
const name = 'Vue Typescript Admin'

module.exports = {
  // TODO: Remember to change publicPath to fit your need
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-typescript-admin-template/' : '/',
  lintOnSave: process.env.NODE_ENV === 'development',
  // FIXME:配置省略文件后缀,现在是没有作用的
  // configureWebpack: (config) => {
  //   config.resolve = { // 配置解析文件类型,可在导入时省略
  //     extensions: ['ts','.js', '.json', '.vue'],
  //     alias:{//配置路径别名
  //       'comp':resolve(__dirname,'./src/components'),
  //       'asset':resolve(__dirname,'./src/asset'),
  //       'style':resolve(__dirname,'./src/styles'),
  //       'util':resolve(__dirname,'./src/utils'),
  //       'mixin':resolve(__dirname,'./src/mixins'),
  //     }
  //   }
  // },
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // provide the app's title in html-webpack-plugin's options list so that
    // it can be accessed in index.html to inject the correct title.
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config.plugin('html').tap(args => {
      args[0].title = name
      return args
    })
    // 配置别名，配合tsconfig.json
    config.resolve.alias
      .set('comp', resolve('src/components'))
      .set('asset', resolve('src/assets'))
      .set('style', resolve('src/styles'))
      .set('util', resolve('src/utils'))
      .set('mixin', resolve('src/mixins'))
  }
}
