"use strict";
var http = require('http');
var url = require('url');
var util = require('util');
var querystring = require('querystring');
var mysql      = require('mysql');
var xss = require('xss');
var db;

function handleConnect() {
      db = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'root',
      database : 'cityblog'
    }); 
    db.connect(function(err) {        
      if(err) {                                    
        console.log('error when connecting to db:', err);
        setTimeout(handleConnect, 2000);
      }                                     
    });                                     
    db.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleConnect();                       
      } else {                                      
        console.log(err)        
      }
    });
  }
console.log('博客服务开启');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf8','Access-Control-Allow-Origin':'*'});
    let path=url.parse(req.url).pathname
    let getobj=querystring.parse(url.parse(req.url).query)
    if(path=="/post"&&getobj.id){
          handleConnect();
          console.log('查询id: '+getobj.id+'的全文');
          db.query('SELECT `content` FROM `post` WHERE pid='+ db.escape(getobj.id), function(err, rows, fields) {
           if (err){
              res.end('{"code":0}');
            }
           	rows=rows[0];
           	rows.code=200;
           	rows.data=rows.content;
           	delete rows.content;
            res.end(JSON.stringify(rows));
            db.end();
                    console.log('关闭连接');
          });
   	}else if(path=="/page"&&getobj.s){
          handleConnect();
          let ex="";
          if(!getobj.e){
          	getobj.e=getobj.s+10;
          }
          if(getobj.class){
          	ex=' WHERE `classify`='+db.escape(getobj.class);
          }
          console.log('查询页面: '+getobj.s+'至'+getobj.e);
          let sql='SELECT * FROM `post`'+ex+' ORDER BY `post`.`pid` DESC limit '+ parseInt(getobj.s)+','+ parseInt(getobj.e)
          db.query(sql, function(err, rows, fields) {
          if (err){
              res.end('{"code":0，"data":"数据库查询失败"}');
           }
          	let obj={"code":200}
          	obj.data=rows;
            res.end(JSON.stringify(obj));
            db.end();
            console.log('关闭连接');
          });
   }else if(path=="/love"&&getobj.id){
   	 handleConnect();
     console.log('添加id: '+getobj.id+'的喜欢');
     db.query("UPDATE `cityblog`.`post` SET `love` =`love`+1 WHERE `post`.`pid` = "+parseInt(getobj.id), function(err, rows, fields) {
     if (err){
      res.end('{"code":0}');
     }
     res.end('{"code":200}');
     db.end();
     console.log('关闭连接');
      });
   }else if(path=="/one"&&getobj.id){
   	handleConnect();
   	console.log('文章: '+getobj.id);
   	db.query('SELECT `pid`,`time`,`love`,`classify`,`title`,`content`,`md` FROM `post` WHERE pid='+ db.escape(getobj.id), function(err, rows, fields) {
           if (err){
              res.end('{"code":0}');
            }
           	rows=rows[0];
           	rows.code=200;
           	rows.data=rows.content;
           	delete rows.content;
            res.end(JSON.stringify(rows));
            db.end();
            console.log('关闭连接');
          });
   	
   }else{
      res.end('{"code":0,"data":"参数错误￣□￣｜｜"}');
   }
}).listen(5280);
