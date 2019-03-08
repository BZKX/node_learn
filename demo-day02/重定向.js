//导入
const http = require('http');

const fs = require('fs');

const path = require('path');

let server = http.createServer((req,res)=>{
    console.log(req.url);
    //请求路径
    let urlPath = req.url;
    //请求方法
    let method = req.method;

    if (req.url === '/'){
        //302表示重定向
        res.writeHead(302,{
            'Location':'login' //键值对=> 键指客户端浏览器将进行重定向 值指客户端浏览器重定向的请求
            //add code ( other headers ) here....
        });
        res.end();
    }
    //登录页
    if (req.url === '/login'){
        fs.readFile(path.join(__dirname,'file','login.html'),function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        })
    }
});

server.listen(8080,()=>{
    console.log('开启成功');
});