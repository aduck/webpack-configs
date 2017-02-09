var webpack=require('webpack')
var HtmlWebpackPlugin=require('html-webpack-plugin')
var CommonsChunkPlugin=webpack.optimize.CommonsChunkPlugin
var ExtractTextPlugin=require("extract-text-webpack-plugin")
var UglifyJsPlugin=webpack.optimize.UglifyJsPlugin

module.exports={
  entry:{
    //"vendor":['react/dist/react.js','react-dom/dist/react-dom.js'],
    "app":__dirname+'/app/main.js'
  },
  output:{
    path:__dirname+'/dest', // 输出目录
    filename:'[name].[hash:8].js', // 输出文件名称
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
        loader:ExtractTextPlugin.extract({fallback:'style-loader',use:'css-loader?modules!postcss-loader'})
        //loader:'style-loader!css-loader?modules!postcss-loader'
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
    }),
    // 提取公共代码
    /*
    new CommonsChunkPlugin({
      name:'vendor',
      minChunks:Infinity
    }),*/
    // 提取css到单独文件
    new ExtractTextPlugin('style.css'),
    // 代码压缩
    new UglifyJsPlugin({
      output:{
        comments:false
      },
      compress:{
        warnings:false
      }
    }),
    // 切换到production环境
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve:{
    // 扩展名
    extensions:['.js','.json','.css','.scss']/*,
    // 定义别名
    alias:{
      "react":"react/dist/react",
      "react-dom":"react-dom/dist/react-dom"
    }*/
  }
}