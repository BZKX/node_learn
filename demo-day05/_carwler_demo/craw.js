//导入模块
var Crawler = require('crawler');

var c = new Crawler({
    maxConnections:10,
    //抓取到数据之后进入回调函数
    callback:function (error, res, done) {
        if (error) {
            console.log(error);
        }else {
            //crawler 会将抓取到的网页数据赋值给jQuery的$对象
            var $ = res.$;

            //只需要使用jQuery语法解析网页即可
            console.log($('#hero_list tr').length);

            $('#hero_list tr').each((index,element)=>{
                //获取英雄名字
                let herName = $(element).find('td a').text();
                console.log(herName);

                //获取英雄技能
                let heroSkill = $(element).find('.mwiki-hide .tt_skill .name a').text();
                console.log(heroSkill);

                //获取英雄图标
                let heroIcon = $(element).find('td>div>a>img').attr('src');
                console.log(heroIcon);
            })
        }

        done();
    }
});


//3.开始抓包
// Queue just one URL, with default callback
c.queue('http://wiki.joyme.com/cq/%E5%89%91%E5%A3%AB');