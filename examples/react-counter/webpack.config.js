const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './src/main.js',
  output: {
    path: './dist/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  stats: {
    colors: true
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './index.html'
    }]),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  );
} else {
  config.devtool = 'source-map';
  config.devServer = { contentBase: '/' };
}

module.exports = config;
