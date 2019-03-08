//路由模块
//导入
const fs = require('fs');
const path = require('path');
//url模块
const url = require('url');
//解析post请求模块
const querystring = require('querystring');
//操作json模块,已写好
const hero = require('./hero.js');

module.exports = (req, res) => {

    //解析路径-->使用url模块
    var urlObjc = url.parse(req.url, true);
    //接口文档中的路由实际是url的pathname部分
    var urlPath = urlObjc.pathname;

    //设计路由
    console.log(urlPath);
    if (urlPath === '/') {
        //首页!
        // 服务器重定向列表数据
        res.writeHead(302, {
            'Location': 'http://127.0.0.1:8080/views/heroList.html'
        });
        //结束响应(如果不结束,浏览器会一直等待知道超时)
        res.end();
    } else if (urlPath === '/heroList' && req.method === 'GET') {
        //返回英雄列表
        //查询数据
        hero.find((err, data) => {
            if (err) {
                throw err;
            } else {
                console.log(data);
                //查询到的数据响应给客户端(服务端不能直接返回js对象，要转成json对象)
                res.end(data);
            }
            ;
        })
    } else if (urlPath === '/heroAdd' && req.method === 'POST') {
        //添加英雄
        //接收post请求
        bodyPares(req, (body) => {
            console.log('已解析的post请求:');
            console.log(body);
            //处理参数
            hero.add(body, (err) => {
                if (err) {
                    res.end(JSON.stringify({
                        err_code: 500,
                        err_msg: err
                    }));
                } else {
                    res.end(JSON.stringify({
                        err_code: 0,
                        err_msg: 'success'
                    }));
                }
            })
        })
    } else if (urlPath === '/heroInfo' && req.method === 'GET') {
        //查看英雄

        //获取get请求
        let heroID = urlObjc.query.id;
        //查询数据库
        hero.find(heroID, (err, data) => {
            if (err) {
                throw err;
            } else {
                //将获取到的值响应给客户端
                res.end(data);
            }
        })
    } else if (urlPath === '/heroDelete' && req.method === 'GET') {
        //删除英雄
        //获取get参数
        let heroID = urlObjc.query.id;

        hero.delete(heroID, (err) => {
            if (err) {
                throw err;
            } else {
                //响应:重定向刷新
                res.writeHead(302, {
                    'Location': '/views/heroList.html'
                });
                res.end();
            }
        })
    } else if (urlPath.indexOf('/views') === 0 || urlPath.indexOf('/node_modules') === 0) {
        //静态资源服务器
        fs.readFile(path.join(__dirname, urlPath), (err, data) => {
            if (err) {
                throw err;
            } else {
                res.end(data)
            }
        })
    } else {
        res.end('404 not found')
    }
}

//解析post请求
function bodyPares(req,callback) {
    //给req注册获取请求事件
    let postData = '';
    req.on('data',function (chuck) {
        //将客户端每一层的数据流放入postData中
        postData += chuck;
    })

    //给req注册end事件
    req.on('end',()=>{
        console.log(postData);

        //使用querystring解析
        let bodyObjc = querystring.parse(postData);

        //返回回到函数参数;
        callback(bodyObjc)
    })
}