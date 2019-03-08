//搭建服务器与设计路由

//导入
const http = require('http');
const router = require('./data/router.js');

//创建服务器
let server = http.createServer((req,res)=>{
    //获取请求方式req.method
    console.log(req.url + ':' + req.method);
    router(req,res);
});

//启动服务器
server.listen(8080,()=>{
    console.log('成功开启');
});

