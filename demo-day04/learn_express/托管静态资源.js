//导入
const express = require('express');
//创建服务器
let app = express();

//托管静态资源

/*
    参数1 => 路径前缀
    参数2 => 要托管的文件夹的绝对路径
 */
app.use('/resource', express.static(__dirname+'/resource'));

app.get('/',(req,res)=>{
    //读取index.html返回
    //express子代响应文件的方法
    console.log('响应 /');
    res.sendFile(__dirname+'/resource/html/index.html');
});

//开启服务器
app.listen(8080,()=>{
    console.log('开启成功');
})