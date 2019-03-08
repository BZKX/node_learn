//路由中间件
//操作hero.json文件模块
const hero = require('./data/hero.js');

/* express 路由使用流程 */
//导入express模块
var express = require('express');

//创建路由
var app = express();

// 处理请求

//首页
app.get('/',(req,res)=>{
    console.log(1);
    //服务端重定向view/heroList.heml
    res.writeHead(302,{
        'Location': 'views/heroList.html'
    });
    res.end();
});

//英雄列表
app.get('/heroList',(req,res)=>{
    //展示首页列表数据
    hero.find((err,jsonData)=>{
        console.log(jsonData);
        if (err) {
            throw err;
        }else {
            res.end(jsonData);
        }
    })
});

//添加英雄
app.post('/heroAdd',(req,res)=>{
    //完成解析后,将得到的数据存入json文件
    hero.add(req.body,(err)=>{
        if (err) {
            res.end(JSON.stringify({
                err_code: 500,
                err_msg: err
            }))
        }else {
            res.end(JSON.stringify({
                err_code: 0,
                err_msg: 'success'
            }))
        }
    })
});

//查询英雄
app.get('/heroInfo',(req,res)=>{
    var heroID = req.query.id;

    hero.find(heroID,(err,data)=>{
        if (err) {
            throw err;
        }else {
            res.send(data);
        }
    })
});

//删除英雄
app.get('/heroDelete',(req,res)=>{
    //获取请求参数
    let heroID = req.query.id;

    hero.delete(heroID,(err)=>{
        if (err) {
            throw err;
        }else {
            res.writeHead(302,{
                'Location': 'views/heroList.html'
            });
            res.end();
        }
    })
});

//导出模块
module.exports = app;