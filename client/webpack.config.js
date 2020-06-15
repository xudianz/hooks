const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: {
      index: 'index.html '
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'node_modules')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(t|j)sx?$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },  
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        use: ['url-loader']
      }
    ]
  },
  plugins: [ 
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}