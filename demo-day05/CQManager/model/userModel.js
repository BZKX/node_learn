//导入模块
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://127.0.0.1/CQManager',{ useNewUrlParser: true });

//创建Model
let user = mongoose.model('users',{userName:String,passWord:String})

//导出Model
module.exports = user;