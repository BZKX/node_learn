//导入模块
var fs = require('fs');

const Crawler = require('crawler');

var c = new Crawler({
    encoding:null,
    jQuery:false,
    callback:function (err, res, done) {
        if (err) {
            console.log(err.stack);
        }else {
            //将抓到的文件存在本地
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        done();
    }
});

//开始抓包
c.queue({
    uri:"http://p6.qhimg.com/dr/72__/t019d01918ef9f45d4e.png",
    filename:'./img/'
})