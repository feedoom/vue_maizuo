module.exports = {
  devServer: {
    proxy: {
      '/gateway': {
        target: 'http://m.miguvideo.com',
        changeOrigin: true
      }
    }
  },
  publicPath: './'
}
