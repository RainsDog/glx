
//'use strict'  // 使用最严格的语法
 
var http = require('http');  // 引入http模块。相当于C++中的include头文件
var fs=require("fs");

var app = http.createServer(function(req, res){
        res.writeHead(200, {'Content-Type' : 'text/html'});
//        res.end('Hello zhubingqing shi shabi\n');  // 相应客户端请求
	fs.readFile("/root/project/pinyougou/index.html","utf-8",function(err,data){
        if(err) {
           	console.log("index.html loading is failed :"+err);
        }
        else{
        	//返回index.html页面
        	res.end(data);
        }
     });
}).listen(3000, '0.0.0.0');  // 3000端口监听，任意IP网卡
