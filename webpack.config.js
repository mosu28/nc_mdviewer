var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './app.jsx',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }]
    }]
  },
  output: {
    path: path.join(__dirname, 'js/'),
    filename: 'app.bundle.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
