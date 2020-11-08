module.exports = {
  mode: "development",
  cache: {
    // 1. 将缓存类型设置为文件系统
    type: "filesystem",
    
    buildDependencies: {
      // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
      config: [__filename]
      
      // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
      // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
    }
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "vue-style-loader",
          "style-loader", // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  },
  devServer: {
    overlay: true,
    compress: true,
    stats: {
      preset: 'errors-warnings',
      colors: true,
    },
    open: true,
    hot: true,
    publicPath: "/",
    contentBase: "./dist",
    // 解决开发环境下的跨域 https://webpack.docschina.org/configuration/dev-server/#devserverproxy
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000',
      //   pathRewrite: {'^/api' : ''}
      // }
    }
  }
};
