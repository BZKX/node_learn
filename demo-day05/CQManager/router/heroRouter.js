//导入express
const express = require('express');
//创建路由app
let app = express();

//分发请求个C层
const heroController = require('../controller/heroController.js');
app.get('/',heroController.showHeroList) //重定向显示首页
.get('/heroList',heroController.getHeroList) //获取所有的英雄列表
.get('/heroPage',heroController.getHeroPageList) //分页查询英雄列表
.get('/heroSearch',heroController.getHeroSearchList) //搜索英雄
.post('/heroAdd',express.upload.single('icon'),heroController.doHeroAdd) //添加英雄 icon是input标签的name属性值
.get('/heroInfo',heroController.getHeroInfo) //查询英雄
.post('/heroUpdate',express.upload.single('icon'),heroController.doHeroUpdate)//编辑英雄
.get('/heroDelete',heroController.doHeroDelete); //删除英雄

//导出路由
module.exports = app;