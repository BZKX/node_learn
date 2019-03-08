const svgCaptcha = require('svg-captcha'); //导入验证码中间件

let captchaTxt; //申明一个全局变量存储服务端生成的验证码文本

//导入M层
const userModel = require('../model/userModel.js');

//导出C层
module.exports = {
    //注册
    register: (req, res) => {
        //获取psot请求
        let body = req.body;
        console.log(body);
        //处理
        // code: 0 成功   1：用户已注册  2：验证码错误  500：服务器内部错误
        if (body.code.toLowerCase() != captchaTxt.toLowerCase()) {
            //验证码错误
            req.send({
                err_code: 2,
                err_msg: '验证码错误'
            });
        } else {
            //检测是否已经被注册
            userModel.find({
                usrName: body.userName
            }, (err, docs) => {
                if (err) {
                    res.send({
                        err_code: 500,
                        err_msg: err
                    })
                } else if (docs.length != 0) {
                    res.send({
                        err_code: 1,
                        err_msg: '用户已存在'
                    })
                } else {
                    //没有被注册,写入数据库
                    userModel.create({
                        userName: body.userName,
                        passWord: body.passWord
                    }, (err) => {
                        if (err) {
                            res.send({
                                err_code: 500,
                                err_msg: err
                            })
                        } else {
                            res.send({
                                err_code: 0,
                                //注册成功
                                err_msg: 'success'
                            })
                        }
                    })
                }
            })
        }
    },
    //登录
    login: (req, res) => {
        //post请求
        let body = req.body;
        console.log(body);
        //处理请求
        // code: 0 成功   1：用户名错误 2：密码错误  500：服务器内部错误
        //检查用户名是否存在
        userModel.find({
            userName: body.userName
        },(err,docs)=>{
            if (err){
                res.send({
                    err_code:500,
                    err_msg:err
                })
            }else if (docs.length === 0){
                //用户不存在
                res.send({
                    err_code:1,
                    err_msg:'用户名不纯在'
                });
            } else {
                //检查密码是否正确
                let user = docs[0]; //数组第一个元素是用户数据
                if (user.passWord != body.passWord){
                    res.send({
                        err_code : 2,
                        err_msg: '用户名或密码错误'
                    });
                } else {
                    req.session.user = req.body.userName;
                    res.send({
                        err_code:0,
                        err_msg:'success'
                    })
                }
            }
        })
    },
    //登出
    logout: (req, res) => {
        //清空session
        req.session = null;
        //重定向显示首页
        res.writeHead(302,{
            'Location':'/resource/view/index.html'
        });
        res.end()
    },
    //获取验证码
    captcha: (req, res) => {
        //创建验证码对象
        var captcha = svgCaptcha.create();
        //获取验证码并保存
        captchaTxt = captcha.text;
        console.log(captchaTxt);
        //响应验证码
        res.type('svg');
        res.status(200).send(captcha.data)
    }
};