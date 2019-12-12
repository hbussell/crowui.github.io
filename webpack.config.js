var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pixi-crow.bundle.js'
  },
  plugins: [
	new CopyWebpackPlugin([
            {from:'src/index.html',to:'index.html'} 
        ]), 
  ]
};
