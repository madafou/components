const path = require("path");
module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        /*  */
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use('vue-markdown-loader')
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .loader(path.resolve(__dirname, "./md-loader/index.js"))
    },
}