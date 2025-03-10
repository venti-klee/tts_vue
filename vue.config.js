const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.module
        .rule('srt')
        .test(/\.srt$/)
        .type('asset/source');
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "http": require.resolve("stream-http")
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {

        target: 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
        ws: true,
        // 控制请求头中的host
        changeOrigin: true,
        // 将代理前缀名称替换为后端的真实前缀名称
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
