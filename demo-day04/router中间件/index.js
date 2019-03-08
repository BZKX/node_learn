//导入模块
const express = require('express');

//创建服务器

var app = express();

//index.js 是服务器入口文件,所有网络请求都会进入这里,通过路由将网络请求分发到路由模块

//使用路由模块router.js

app.use(require('./router'));

//开启服务器
app.listen(8080,()=>{
    console.log('开启成功');
});