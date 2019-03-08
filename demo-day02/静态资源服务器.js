/* WEB 开发特点 => html中所有外部资源路径都会变成网络请求 */

//导入模块(module)

const http = require('http');

const fs = require('fs');

const path = require('path');

//创建服务器
let server = http.createServer((req, res) => {
        console.log(req.url);
        if (req.url === '/') {
            //读取文件响应给客户端
            fs.readFile(path.join(__dirname, 'src', 'index.html'),
                (err, data) => {
                    if (err) {
                        throw err; //如果读取失败，抛出异常
                    } else {
                        res.end(data); //如果读成功，响应给客户端
                    }
                })
        } else if (req.url === '/css/index.css') {
            fs.readFile(path.join(__dirname, 'src', 'css', 'index.css'),
                (err, data) => {
                    if (err) {
                        throw err;
                    } else {
                        res.end(data)
                    }
                })
        } else if(req.url === '/img/demo.jpg'){
            fs.readFile(path.join(__dirname,'src','img','demo.jpg'),
                (err,data)=>{
                if (err) {
                    throw err;
                }else {
                    res.end(data)
                }
                })
        } else {
            res.end('404 not found');
        }
    })
;

//开启服务器
server.listen(8080, () => {
    console.log('开启成功');
});