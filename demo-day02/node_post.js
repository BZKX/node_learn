//导入
const http = require('http');

var querystring = require('querystring');

let server = http.createServer((req,res)=>{
    console.log(req.url + ':' + req.method);
    /*
        node 接收post请求

            1.post请求的参数是在请求体中,无法使用get的方式来接收post请求的参数
            2.post请求的特点: post请求的参数无法一次获取,可能是多次
     */

    //1.给req对象注册一个data事件:表示开始接收post请求参数
    let postData = '';
    req.on('data',function (chuck) {
        postData += chuck;
    });

    //2.给req对象注册一个end事件,表示本次post数据发送完毕
    req.on('end',function () {
        //当客户端本次post请求数据发送完毕以后,会执行这个函数
        console.log(postData);

        //3.解析post参数得到的参数对象
        var postObjc = querystring.parse(postData);
        console.log(postObjc);

        //响应客户端
        res.end(JSON.stringify(postObjc));
    })

});

server.listen(8080,()=>{
    console.log('开启成功');
})