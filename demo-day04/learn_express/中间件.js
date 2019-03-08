//导入
const express = require('express');



let app = express();

/*
    什么是中间件 ==> 函数(三个参数)
        function(req,res,next){
            req:请求对象
            res:相应对象
            next:下一个中间件
        }

     使用方法
     1. app.use('pathname',中间件) :
                pathname 不写,任何请求路径都会执行
                pathname 写了,任何以pathname 开头的请求路径都会执行
     2. app.get('pathname',中间件) :
                请求路径为pathname的get请求会执行
     3. app.post('pathname',中间件):
                请求路径为pathname的post请求会执行

     执行流程
        a. 从上往下一次匹配请求路径,如果匹配成功则执行该中间件
        b. 如果这个中间件调用了next() ,则会继续往下匹配
        c. 如果所有的中间件都无法匹配,则会进入一个兜底的中间件响应返回404 not found

 */

app.use('/abc',(req,res,next)=>{
    console.log('执行第一个中间件');
    req.a = '第一步!';
    next()
});

app.use('/abc',(req,res,next)=>{
    console.log('执行第二个中间件');
    req.b = '第二步';
    next();
});

app.post('/abc',(req,res,next)=>{
    console.log('post');
    res.end('post');
    next()
});

// app.use(require('bodyParse.js'));

app.get('/abc',(req,res,next)=>{
    console.log('get');
    console.log(req.a);
    console.log(req.b);
    res.send('hello');
});

//默认兜底函数(可自定义)

app.use((req,res)=>{
    console.log(55555);

    res.send('你的路径是不是写错啦');
});

//开启服务器
app.listen(8080,()=>{
    console.log('开启成功');
});