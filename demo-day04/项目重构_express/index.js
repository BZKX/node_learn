//导入模块
const express = require('express');

var app = express();

//配置中间件
//托管静态资源
app.use('/node_modules',express.static(__dirname+'/node_modules'));

app.use('/views',express.static(__dirname+'/views'));

//body-parser
var bodyParser = require('body-parser'); //导入模块

//使用中间件
app.use(bodyParser.urlencoded({ extended: false}));

//配置路由中间件
app.use(require('./router.js'));

app.listen(8080,()=>{
    console.log('开启成功');
});