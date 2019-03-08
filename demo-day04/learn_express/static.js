const fs = require('fs');

module.exports = {
    static:(path)=>{
        //先保存调用者传递过来的文件夹路径

        let handler = (req,res,next)=>{
            //读取静态资源文件返回
            fs.readFile(path + req.url,(err,data)=>{
                res.end(data);
                next();
            });
        };
        return handler;
    }
}