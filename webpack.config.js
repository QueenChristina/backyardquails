const webpack = require('webpack');
const path = require('path');

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public/'),
    publicPath: '/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  devServer: {
    contentBase: 'public',
    watchContentBase: true
  }
  }
};

module.exports = config;