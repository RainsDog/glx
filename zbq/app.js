//严格语法模式
'use strict'

//加载所需要的模块
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const querystring = require('querystring');

//创建服务器
const server = http.createServer();

//响应客户端请求
server.on('request', (req, res) => {
    // 请求方式
    const method = req.method;
    console.log(method);
    // 请求地址
    var { pathname, query } = url.parse(req.url, true);

    pathname = pathname == '/' ? '/login.html' : pathname;

    //将用户请求路径转换为实际硬盘路径
    let realPath = path.join(__dirname, pathname);
    console.log(realPath);
    //获取请求路径的文件类型
    let type = mime.getType(realPath);

    if (method == 'GET') {
        fs.readFile(realPath, (err, doc) => {
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
    } else if (method == 'POST') {
        if (pathname == '/login.html') {
            // 接受用户提交的信息
            let formData = '';
            // 接受post参数
            req.on('data', param => {
                    formData += param;
                })
                // post参数接受完毕
            req.on('end', async() => {
                let user = querystring.parse(formData);
                // 301代表重定向
                // location 跳转地址
                console.log(user);
                res.writeHead(301, {
                    Location: '/index.html'
                });
                res.end();
            })
        }
    }
})

//监听端口80
server.listen(3000);