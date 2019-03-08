//导入module
const path = require('path');

//合并路径
/**
 *  使用path模块拼接文件路径与使用'+'的好处:
 *      1.会自动帮我们正确的添加分隔符'/'
 *      2.当我们路径格式错误时,会智能改正
 */

let filePath = path.join(__dirname,'file','demo_day02.txt');
console.log(filePath);