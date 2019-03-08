//导入模块
var Crawler = require('crawler');

//导入M层
const heroModel = require('./heroModel.js');

//创建对象,抓取数据
var Datec = new Crawler({
    maxConnections:10,

    callback:function (err, res, done) {
        if (err) {
            console.log(err);
        }else {
            //crawler会将抓取到的网页数据赋值个jQuery对象
            var $ = res.$;

            //申明空数组
            let heroArr = [];
            $('#hero_list tr').each((index, element) => {
                //获取名字
                let heroName = $(element).find('td>.hero-icon .class-icon>a').attr('title');
                console.log(heroName);

                //获取技能
                let heroSkill = $(element).find('.mwiki-hide .tt_skill .name a').text();
                console.log(heroSkill);

                //获取英雄图标
                let heroIcon = $(element).find('td>div>a>img').attr('src');
                console.log(heroIcon);

                let imgPath = '/img/'+heroName+'.png' ; //拼接文件绝对路径
                Filec.queue({
                    uri:heroIcon,
                    filename:imgPath //本地文件路径
                });

                //将英雄对象添加到数组中
                heroArr.push({
                    name:heroName,
                    skill: heroSkill,
                    icon:'/img/'+ heroName + '.png' //url路径
                })
            });

            //将数组添加到数据库
            //抓取到的而第一个元素是表头,需要去掉
            heroArr.shift();
            console.log(heroArr);

            heroModel.create(heroArr,(err)=>{
                if (err) {
                    console.log('抓包入库失败');
                }else {
                    console.log('success');
                }
            })
        }
        done()
    }
});

//3.开始抓包
// Queue just one URL, with default callback
Datec.queue('http://wiki.joyme.com/cq/%E5%89%91%E5%A3%AB');

//创建抓包对象
const fs = require('fs');
var Filec = new Crawler({
    encoding:null,
    jQuery:false,
    callback:function (err, res, done) {
        if (err) {
            console.log(err.stack);
        }else {
            //自动帮我们吧抓取的文件写入本地
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        done()
    }
});