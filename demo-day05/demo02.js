//导入模块
const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/demo02',{useNewUrlParser:true});


//创建Model

let student = mongoose.model('students',{name:String,age:Number});

/*
    增删查改由Model负责
        mongoose的操作是异步的,提高性能
 */

//增加数据

// student.create([{name: '野狗小学生',age: 2},{name:'张三',age:4}],(err)=>{
//     if (err) {
//         console.log('操作失败');
//     }else {
//         console.log('添加成功');
//     }
// });

//删除数据

// student.deleteOne({name:'张三'},(err)=>{
//     if (err) {
//         console.log('操作失败');
//         throw err;
//     }else {
//         console.log('删除成功');
//     }
// });

//修改数据

// student.update({name:'野狗小学生'},{name:'王五',age: 2},(err)=>{
//     if (err) {
//         console.log('操作失败');
//         throw err;
//     } else {
//         console.log('更新成功');
//     }
// })

//修改满足条件的所有数据
// student.updateMany({name: '王五'},{name:'五五'},(err)=>{
//     if (err) {
//         console.log('操作失败');
//         throw err;
//     } else {
//         console.log('更新成功');
//     }
// });


//查询数据

// student.find((err,docs)=>{
//     if (err){
//         console.log('操作失败');
//     } else {
//         console.log(docs);
//     }
// })

student.findByIdAndDelete('5c7f6cd6796aa035903c8de4',(err,doc)=>{
    if (err){
        console.log('操作失败');
    } else {
        console.log(doc);
    }
});

