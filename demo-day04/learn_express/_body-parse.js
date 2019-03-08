//导入模块
const express = require('express');

let app = express();

//使用第三方中间件

var bodyParser = require('body-parser');//导入中间件

//使用中间件
app.use(bodyParser.urlencoded({extended:false}));

app.post('/abc',(req,res,next)=>{
    console.log(req.body);
    //告诉客户端我收到参数
    res.send(req.body);
});

app.post('/efg',(req,res,next)=>{
    console.log(req.body);
    res.send(req.body);
});

app.listen(8080,()=>{
    console.log('开启成功');
});