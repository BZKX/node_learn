//导入模块
const mongoose = require('mongoose');

//连接
/*
    27017:MongoDB的默认端口号
    test:要连接的数据库名字,有则连接,没有则创建
 */

mongoose.connect('mongodb://localhost:27017/demo01',{useNewUrlParser:true});

//创建Model (相当于table表)
//第一个参数: Model名称
//第二个参数: 表中储存的结构Schema
const Cat = mongoose.model('Cat',{name:String});

//创建 Entity(相当于table表中插入一条数据

const Kitty = new Cat({name: '一只猫'});

//插入数据

Kitty.save().then(()=> console.log('meow'))