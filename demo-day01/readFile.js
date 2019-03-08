const fs = require('fs');

//读取文件

/**
 * 第一个参数: 文件路径
 * 第二个参数: 编码格式(可选参数,默认为buffer二进制)
 * 第三个参数: 读取回调操作(异步)
 *  err:如果读取成功,err为null,否则读取失败
 *  data: 读取到的数据
 */

fs.readFile('./demo-day01/file/demo_test.txt','utf-8',(err,data)=>{
    if (err) {
        console.log(err);
        //抛出异常,
        throw err;
    }else {
        console.log(data);
    }
});

console.log('test');

