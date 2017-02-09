var webpack=require('webpack')
var HtmlWebpackPlugin=require('html-webpack-plugin')

module.exports={
  devtool:'#eval-source-map', // 调试模式
  entry:__dirname+'/app/main.js',
  output:{
    path:__dirname+'/dest', // 输出目录
    filename:'bundle.js', // 输出文件名称
  },
  module:{
    loaders:[
      // json
      {
        test:/\.json$/,
        loader:'json-loader'
      },
      // babel
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      },
      // css style
      {
        test:/\.css$/,
        //loader:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader?modules!postcss-loader'})
        loader:'style-loader!css-loader?modules!postcss-loader'
      }
    ]
  },
  plugins:[
    // 第三方需要在这里配置
    new webpack.LoaderOptionsPlugin({
      options:{
        // css管理工具
        postcss:function(){
          return [require('autoprefixer')]
        }
      }
    }),
    // html文件生成
    new HtmlWebpackPlugin({
      template:__dirname+"/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
    })
  ],
  devServer:{
    contentBase:'./dest', // 本地服务器加载页面目录
    noInfo:true,
    historyApiFallback:true, // h5 history api
    inline:true // 实时刷新
  },
  resolve:{
    // 扩展名
    extensions:['.js','.json','.css','.scss']
  }
}