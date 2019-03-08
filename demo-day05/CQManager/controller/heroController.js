//导入M层
const heroModel = require('../model/heroModel.js');

//导出C层
module.exports = {
    showHeroList: (req, res) => {
        res.writeHead(302, {
            'Location': '/resource/view/index.html'
        });
        res.end();
    },
    getHeroList: (req, res) => {//英雄列表
        heroModel.find((err, docs) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                })
            } else {
                //计算页数(一页10个)
                // console.log(docs.length);
                let pageCount = Math.ceil(docs.length / 10);
                //返回客户端第一页数据 和 页数
                res.send({
                    heros: docs.slice(0, 10),
                    pageCount,
                    user: req.session.user
                });
            }
        })
    },
    getHeroPageList: (req, res) => {
        //获取请求参数
        let page = req.query.page;
        //查询数据库
        heroModel.find((err, docs) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                });
            } else {
                //返回客户端 - 指定页数数据
                res.send({
                    heros: docs.slice((page - 1) * 10, page * 10)
                })
            }
        })
    },
    getHeroSearchList: (req, res) => {
        //获取请求参数searchStr
        let searchStr = req.query.searchStr;
        //查询数据库
        let reg = new RegExp(searchStr);
        heroModel.find({name: reg}, (err, docs) => {
            if (err) {
                res.send({
                    err_code: 500,
                    err_msg: err
                });
            } else {
                //返回客户端 查询到的数据库
                res.send({
                    heros: docs,
                });
            }
        })
    },
    doHeroAdd: (req, res) => {
        //获取请求参数
        let hero = req.body;
        //手动设置英雄icon属性
        hero.icon = '/img/' + hero.name + '.png';
        //处理,添加到数据库
        heroModel.create(hero,(err)=>{
            if (err){
                res.send({
                    err_code:500,
                    err_msg:err
                })
            } else {
                res.send({
                    err_code:0,
                    err_msg:'success'
                })
            }
        })
    },
    getHeroInfo:(req,res)=>{
        res.send('查询英雄详情')
    },
    doHeroUpdate:(req,res)=>{
        //获取请求参数
        let hero = req.body;
        console.log(hero);

        //处理:更新数据
        //第一个参数:id 第二个参数: 修改后的数据 第三个参数:回调函数
        heroModel.findByIdAndUpdate(hero._id,hero,(err)=>{
            if (err) {
                res.send({
                    err_code:500,
                    err_msg:err
                })
            }else {
                res.send({
                    err_code:0,
                    err_msg:'success'
                })
            }
        })
    },
    doHeroDelete:(req,res)=>{
        //获取请求参数
        let heroID = req.query._id;
        console.log(heroID);
        //处理数据:删除
        heroModel.findByIdAndDelete(heroID,(err)=>{
            //重定向刷新首页
            res.writeHead(302,{
                'Location':'/'
            });
            res.end();
        })
    }
};