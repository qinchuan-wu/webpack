const path = require('path');
const proxy = require('http-proxy-middleware');



module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"bundle.js"
    },
    devServer:{
        host: 'localhost',
        contentBase:path.join(__dirname,"view"),
        compress:false,
        port:8080,
        publicPath:"/dist/",
        proxy:{
            '/api':{
                target: 'http://192.168.1.30:8085',//代理地址，这里设置的地址会代替axios中设置的baseURL
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                //ws: true, // proxy websockets
                //pathRewrite方法重写url
                pathRewrite: {
                    '^/api': '/' 
                    //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
                    //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
               }
        }}
    }
}