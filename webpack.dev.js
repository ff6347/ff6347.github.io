const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// if we want to create a sseparate css file we
// need this module

module.exports = merge(common, {
  mode: 'none',
  devtool: 'source-map',
  watch: true,
});
