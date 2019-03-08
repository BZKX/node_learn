//导入模块
const http = require('http');
const fs = require('fs');

//2.创建服务器
/**
 * createServer 相当于安装了 phpstudy 中的Apache
 *      参数: 回调函数
 *              req:request --> 客户端请求数据
 *              res:response --> 服务端响应的数据
 */

let server = http.createServer((req,res)=>{
    //服务端没有到一个客户端的请求都会执行一次回调函数,这个函数会执行多次

    //req.url:获取客户端请求的路径

    console.log(('客户端请求的数据' + req.url));

    //res:响应客户端请求
    /* 注意:服务器响应给客户端只能是两种数据类型: 1) 文本 === 2) 二进制 . 否则会报错 */
    // res.end('<h1>hello world! this is a file for http-server.js</h1>')


    //**根据不同的请求响应不同的数据
    // if (req.url === '/'){
    //     res.end('<h2>this is a standard res</h2>')
    // } else if (req.url === '/login'){
    //     //***设置服务器想用头: 告诉服务端,响应类型
    //     res.writeHead(200,{
    //         'Content-Type':'text/html;charset=utf8'
    //     });
    //     res.end('<h2>this is a response for /login</h2>')
    // }else {
    //     res.end('404 not found')
    // }

    //TODO: ***http响应客户端HTML文件-->
    if (req.url === '/'){
        fs.readFile('./demo-day01/file/demo_index.html',(err,data)=>{
            if (err) {
                throw err;
            }else {
                console.log(data);
                res.end(data);
            }
        });
    }else if (req.url === '/login'){
            //***设置服务器想用头: 告诉服务端,响应类型
            res.writeHead(200,{
                'Content-Type':'text/html;charset=utf8'
            });
            res.end('<h2>this is a response for /login</h2>')
        }


});

//启动服务器
/**
 *  参数1: 端口号
 *  参数2: ip地址, 默认不写,就是本机ip(127.0.0.1)
 */

server.listen(8080,'127.0.0.1',err=>{
    if (err){
        console.log("服务器启动失败");
    } else {
        console.log('启动成功');
    }
})