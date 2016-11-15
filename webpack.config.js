module.exports = {
  context: __dirname,
  entry: './assets/javascripts/main.js',
  output: {
    path: './assets/javascripts',
    filename: 'bundle.js',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js' ]
  }
};
