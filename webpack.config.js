var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
	rules: [
		{ 
			test: /\.jsx?$/, 
			loader: 'babel-loader', 
			exclude: /node_modules/ 
		},
        {
            test: /\.css$/,
            loader: 'style-loader'
        },
        {
            test: /\.css$/,
            loader: 'css-loader',
            query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
            }/*,
            options: { url: false }*//*https://github.com/postcss/postcss-loader/issues/160*/
        }




	]
  },
  devServer: {
      historyApiFallback: true, //every path redirected to index, and then resolved by react-router
      headers: {
          "Access-Control-Allow-Origin":  '*'
      },
      contentBase: path.resolve(__dirname, "dist")
  }
};