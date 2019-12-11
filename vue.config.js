const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devServer: {
    proxy: process.env.BASE_URL,
    port: 8000
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.push(
        new CompressionPlugin({
          deleteOriginalAssets: true
        })
      );
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins.delete("prefetch");
      config.plugins.delete("preload");
    }
  }
};
