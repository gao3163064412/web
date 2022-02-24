'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const Version = new Date().getTime()
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '惠州仲恺' // 标题
const port = process.env.port || process.env.npm_config_port || 8080 // 端口
// vue.config.js 配置说明
//官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
// 这里只列一部分，具体配置参考文档
module.exports = {
  // 部署生产环境和开发环境下的URL。
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
  // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'pc',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // productionSourceMap: true,
  // slb 向 CSS 相关的 loader 传递选项。  参考 https://cli.vuejs.org/zh/config/#css-sourcemap
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require('postcss-pxtorem')({
      //       rootValue: 14, // 换算的基数
      //       // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
      //       propList: ['*'],
      //     }),
      //   ]
      // },
    },
    // 是否使用css分离插件 ExtractTextPlugin-------slb
    extract: process.env.NODE_ENV === 'production' ? {
      // 修改打包后css文件名   // css打包文件，添加时间戳
      filename: `static/css/[name].${Version}.css`,   // 此处static/css/xxx 目录根据自己打包情况来定,我使用的就没有static一层,所以直接去掉static即可。根据自己项目决定
      chunkFilename: `static/css/[name].${Version}.css`
    } : false
  },
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: port,
    open: true,
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {//这里的代理只对 开发环境 生效
        // target: `http://hjkx.sygt66.com/hz-api`,
        // target: `http://192.168.31.23:30019/hz-api`,//张天龙-联调
        // target: `http://192.168.31.23:30020/hz-api`,//张天龙
        // target: `http://192.168.31.25:30020/hz-api`,//曹敏
        // target: `http://192.168.31.25:30020/hz-api`,//曹敏
        // target: `http://124.114.22.123:30019/hz-api`,//张总
        // target: `http://192.168.31.5:30020/hz-api`,//康阳
        // target: `http://192.168.31.24:30019/hz-api`, //张文琪
        target: `http://192.168.31.50:30019/hz-api`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      // filename: utils.assetsPath('js/[name].[chunkhash].'+Version+'js'),
      // chunkFilename: utils.assetsPath('js/[id].[chunkhash].'+Version+'js')
      filename: `static/js/[name].${Version}.js`,         // js打包文件，添加时间戳
      chunkFilename: `static/js/[name].${Version}.js`
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single'),
          {
            from: path.resolve(__dirname, './public/robots.txt'), //防爬虫文件
            to: './', //到根目录下
          }
        }
      )
  }
}
