const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// if we want to create a sseparate css file we
// need this module

module.exports = {
  mode:'production',
  devtool:'source-map',
  watch: true,
  context: path.resolve(__dirname, './'),
  entry: {
    index: './assets/js/index.js'
  },
  output: {
    path: path.resolve(__dirname, './'),
    filename: './assets/js/[name].bundle.js'
  },
  // if we want to refernce our css within the js this is the way to go
  // but it seems a bit odd to require('style.css') in a css file.
  // Still - this would add the css to the head of the index.html file
  // module: {
  //   loaders: [
  //           {test: /\.css$/, loader: 'style-loader!css-loader'}
  //   ]
  // },
  devServer: {
    contentBase: path.resolve(__dirname, './')  // New
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: true,
          ecma: 6,
          mangle: false
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
  ]
};
