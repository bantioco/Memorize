const webpack   = require('webpack');
const path      = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: './assets/js/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.js',
    publicPath: "/build/"
  },
  module: {
    rules: [
    {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {}
        }
      ]
    },
    {
       test: /\.js$/,
       loader: 'babel-loader',
       exclude: /node_modules/,
       query: {
           presets: ['env']
       }
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;
