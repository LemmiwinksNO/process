var path = require('path');
var rootDir = path.resolve(__dirname);

module.exports = {
  context: rootDir,
  devtool: 'eval',
  entry: [
    // 'babel-polyfill',
    './asset/js/main.js'
  ],
  output: {
    filename: './dist/application.js',
    sourceMapFilename: './dist/application.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
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
