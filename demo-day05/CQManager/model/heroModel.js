//导入模块
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/CQManager',{useNewUrlParser: true});

//创建Model

let hero = mongoose.model('heros',
    {name:String,icon:String,skill:String});

// 导出model
module.exports = hero;