//导入express
const express = require('express');
//创建路由app
let app = express();

//分发请求给c层
const userController = require('../controller/userController.js');
app.post('/register',userController.register)
.post('/login',userController.login)
.get('/logout',userController.logout)
.get('/captcha',userController.captcha);

//导出路由
module.exports = app;