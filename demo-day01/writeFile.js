//导入模块
const fs = require('fs');

/**
 * 第一个参数: 文件路径
 * 第二个参数: 要写入的数据
 * 第三个参数: 文件编码,默认utf-8
 * 第四个参数: 异步回调-->同readFile相同-->err
 */
fs.writeFile('./demo-day01/file/demo_test.txt',
    'this is a file for writeFile.js',
    'utf-8',err => {
        if (err){
            throw err;
        } else {
            console.log('写入成功');
        }
    })