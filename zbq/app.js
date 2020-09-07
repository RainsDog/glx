//严格语法模式
'use strict'

//加载所需要的模块
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

//创建服务器
const server = http.createServer();

//响应客户端请求
server.on('request', (req, res) => {
    //获取用户的请求路径
    let { pathname } = url.parse(req.url);
    pathname = pathname == '/' ? '/login.html' : pathname;
    //将用户请求路径转换为实际硬盘路径
    let realPath = path.join(__dirname, pathname);
    console.log(realPath);
    //获取请求路径的文件类型
    let type = mime.getType(realPath);

    fs.readFile(realPath, (err, doc) => {
        //文件读取失败
        if (err) {
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf8'
            });
            res.end('访问错误，请输入正确的网址');
            return;
        } else {
            res.writeHead(200, {
                'content-type': type
            });
            res.end(doc);
        }
    })
})

//监听端口80
server.listen(3000);