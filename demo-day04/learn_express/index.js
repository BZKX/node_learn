const express = require('express');

//创建服务器
/* express()相当于http模块的http.createServer() */
let app = express();

//接收客户端请求
/*
    1) express最大的特点就是子代路由功能,我们无需再一个方法中处理所有请求
    2) 在express中,每个请求都是一个独立的方法
 */
app.get('/',(req,res)=>{
    //响应客户端数据

    //express相应数据 send方法:自动设置好响应头,无需担心中文乱码问题
    res.send('这是使用express框架搭建的服务器');
});

app.get('/heroInfo',(req,res)=>{
    //express 自动帮我们解析get参数,可以直接通过req.query获取
    console.log(req.query);
})

//开启服务器
app.listen(8080,()=>{
    console.log('开启成功');
})