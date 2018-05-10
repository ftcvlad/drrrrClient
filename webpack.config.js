var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/client')
  },
  module: {
	rules: [
		{ 
			test: /\.jsx?$/,
            loader: 'babel-loader', //transpiles jsx, ES6 into javascript
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            loader: 'style-loader' //injects css
        },
        {
            test: /\.css$/,
            loader: 'css-loader',//parse css and apply transforms (e.g. hash to the end of class names)
            query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
            }/*,
            options: { url: false }*//*https://github.com/postcss/postcss-loader/issues/160*/
        },
        {
            test: /\.(png|jpeg|jpg)$/,
            use: [
                {
                    loader: 'url-loader',//Instructs webpack to emit the required object as file and to return its public URL
                    options: {
                        limit: 1, // limit => file.size =< 8192 bytes ? DataURI : File
                        publicPath: '/client'
                    }
                }

            ]
        }




	]
  },
  devServer: {
      historyApiFallback: true, //every path redirected to index, and then resolved by react-router
      headers: {
          "Access-Control-Allow-Origin":  '*'
      },
      contentBase: path.resolve(__dirname, "dist")//,
      //watchContentBase: true //make sure hot reloaded?
  }
};