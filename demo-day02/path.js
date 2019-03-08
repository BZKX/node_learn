//导入模块
const fs = require('fs');

/**
 *  a.注意点: node中的相对路径: ./ 不是相对于当前文件夹的路径,
 *            而是相对于执行node命名的文件夹路径
 *  b.解决方案:在node.js中,每个js文件都有两个全局属性:
 *                  __dirname  => 当前js文件所在的目录的绝对路径
 *                  __filename => 当前js文件的绝对路径
 */

console.log(__dirname);
console.log(__filename);

var path = __dirname + '/file/demo_day02.txt';

fs.readFile(path,'utf-8',(err,data)=>{
    if (err){
        console.log(err);
        throw err;
    } else {
        console.log(data);
    }
});

