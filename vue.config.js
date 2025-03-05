const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    config.module
        .rule('srt')
        .test(/\.srt$/)
        .type('asset/source');
  }
});