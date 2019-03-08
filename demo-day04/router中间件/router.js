/*
    路由中间件是express自带的中间件:
        1.在router.js中导入express: const express = require('express')
        2.在router.js中创建路由容器: let app = express();
        3.在router.js中导出路由容器: moudule.exports = app;
        4.在index.js中使用路由容器:
            app.use(require('./router.js')
 */
var express = require('express');

//创建路由容器

var app = express();

//express支持链式语法
app.get('/abc',(req,res)=>{
    res.send('你的请求路径是/abc');

}).get('/def',(req,res)=>{
    res.send('你的请求路径是/def')
});

//导出模块

module.exports = app;