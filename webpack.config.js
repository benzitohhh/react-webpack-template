const path = require('path');
var webpack = require('webpack');




// TODO:
// babel - don't add all poplyfills etc
// prod - extract css as a file, and read this into html (template)
// prod - minify




module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  resolve: {
    modules: [
      // For js 'import', look in the below dirs:
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // see .babelrc
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            // 3. style loader
            loader: "style-loader"
          },
          {
            // 2. translate CSS into CommonJS module
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // 1. compile Less to CSS
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    port: 8080,
    contentBase: "dist",
    historyApiFallback: true,
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};