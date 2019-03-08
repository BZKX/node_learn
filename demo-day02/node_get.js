//导入模块(module)
const http = require('http');
//TODO: url模块 => 解析url路径得到url协议中的每一部分
const url = require('url');

//创建服务器
let server = http.createServer((req, res) => {
    //req.url => 获取整个url请求 包含路径和参数
    console.log(req.url);

    //decodeURI() => 默认情况下,URL中的中文会进行URI转码
    console.log(decodeURI(req.url));

    /*
        1.使用url模块解析get请求
            第一个参数: 要解析的url
            第二个参数: 布尔类型 true:推荐使用,得到的参数是一个对象
                                false: 得到的参数是字符串
            返回值 : 对象类型-> 将url中的每一部分作为对象属性返回
     */
    let urlObjc = url.parse(req.url, true);
    console.log(urlObjc);

    //获取请求的路径
    let urlPath = urlObjc.pathname;
    console.log(urlPath);

    //获取请求的参数
    let query = urlObjc.query;
    console.log(query);

    //响应客户端的请求
    //服务端不能直接响应js对象,需要转换成json对象
    res.end(JSON.stringify(
        {
            code:10000,
            list:[10,20,30]
        }
    ))
    /*
       {
      protocol: null,//协议名
      slashes: null,//表示 //到第一个/之间都是host
      auth: null,//认证
      host: null,//主机名+ 端口号  hosetname+port
      port: null,//端口号
      hostname: null,//主机名  ip地址
      hash: null,//资源定位符
      search: '?name=OldFe&age=18',
      query: { name: 'OldFe', age: '18' },//get请求的参数对象
      pathname: '/getRequest',//路径
      path: '/getRequest?name=OldFe&age=18',//路径+请求参数
      href: '/getRequest?name=OldFe&age=18' }
       */
});

server.listen(8080, () => {
    console.log('开启成功');
});