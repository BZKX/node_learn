//导入模块
const express = require('express');
//创建服务器
let app = express();

//配置中间件

//托管静态资源
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/resource', express.static(__dirname + '/resource'));

//body-parser:post参数解析
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

//sever-favicon:网站图标
var favicon = require('serve-favicon');
var path = require('path');
app.use(favicon(path.join(__dirname, 'resource', 'favicon.png'))); //网站图标路径

//multer 文件上传
var multer = require('multer');
var storage = multer.diskStorage({
    //设置储存图片的文件夹
    destination: function (req, file, cb) {
        cb(null, __dirname + '/resource/img')
    },
    //文件名
    filename: function (req, file, cb) {
        console.log(req.body);
        console.log(file);
        console.log(cb);
        cb(null, req.body.name + '.png');//英雄名 + png
    }
});

express.upload = multer({
    storage: storage
});


//cookie-session中间件 => 用户回话保持
var cookieSession = require('cookie-session');
app.set('trust proxy', 1) //trust first proxy 信任首次登陆陌生用户
app.use(cookieSession({
    name: 'session',
    keys: ['admin'],//设置加密钥匙
    //cookie options
    maxAge: 60 * 60 * 1000 //1 小时有效期
}));

//查看浏览器上传的cookie
// app.use((req, res, next) => {
//     console.log(req.session);
//     next();
// });

//路由容器
app.use(require('./router/heroRouter.js')); //负责英雄功能路由分发
app.use(require('./router/userRouter.js')); //负责用户功能路由分发


//开启服务器
app.listen(8080, () => {
    console.log('欢迎来到CQ实例');
});