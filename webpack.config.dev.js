var path = require('path');
var rootDir = path.resolve(__dirname);
var webpack = require('webpack');

module.exports = {
  context: rootDir,
  entry: [
    // 'babel-polyfill',
    // 'webpack-hot-middleware/client',
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './asset/js/main.js'
  ],
  output: {
    path: '/',
    publicPath: '/dist/',
    filename: 'application.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  // plugins: [
  //   new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // ],
  module: {
  	loaders: [
  		{
				test: /\.jsx?$/,
        include: path.resolve(__dirname, 'asset/js'),
				loader: 'babel-loader',
				query: {
          // plugins: ['transform-runtime'],
          plugins: ['lodash'],
					presets: ['react', 'es2015', 'stage-2'] 
				}
  		},
      { test: /\.json$/, loader: 'json' }
    ]
  }
}
