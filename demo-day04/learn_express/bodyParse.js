const querystring = require('querystring');

/*
    导出中间件(函数)
        参数1 => 请求对象
        参数2 => 完成回调
            * postObject : post 请求参数对象
 */

module.exports = (req,res,next) => {
    if (req.method == 'POST'){
        //注册data事件
        let postData = '';
        req.on('data',function (chuck) {
            postData += chuck;
        });
        //给req注册一个end事件
        req.on('end',function () {
            //使用querystring解析post参数
            let postObjc = querystring.parse(postData);
            //将解析好的参数对象添加到req属性中
            req.body = postObjc;
            console.log(req.body);
            //执行下一个中间件
            next();
        });
    }
};