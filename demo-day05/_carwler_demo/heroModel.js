/* M层:负责处理数据(增删改查) */

//导入模块
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1/CQManager',{useNewUrlParser:true});

//创建Model heros:表名
let heroModel = mongoose.model('heros',{
    name:String,skill:String,icon:String});

//导出M层
module.exports = heroModel;