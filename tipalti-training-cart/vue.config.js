module.exports = {
  devServer: {
    proxy: {
      '/Home': {
        target: 'https://localhost:44326',
        changeOrigin: true,
      },
    },
  },
};
