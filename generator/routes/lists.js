var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var URL = require('url');
var request = require('request');
var http = require('http');
var cookieParser = require('cookie-parser');
var path = require('path');
var User = require('./data/user');
//var xmlparser = require('express-xml-bodyparser');

router.use(bodyParser.urlencoded({ extended: true, limit: 2 * 1024, parameterLimit: 1000}));
router.use(bodyParser.json())
router.use(cookieParser());
//router.use(xmlparser());
//AccpStudent.xml
// router.post('/student',function(req,res){
// 	res.header("Access-Control-Allow-Origin", "*"); 
// 	var body = '';
// 	var res_data;
	
// })
router.post('/ceshi',function(req,res,){
	res.header("Access-Control-Allow-Origin", "*"); 
	let params = req.query;
	let msg = {message:'成功！',status:'ok'};
	let flag = false;
	console.log(req.body.username)
	console.log(req.body.password)

	res.send(msg)
	
})	

router.post('/login',function(req,res,){
	res.header("Access-Control-Allow-Origin", "*"); 
	let params = req.query;
	let msg = {message:'成功！',status : 1};
	let flag = false;
	console.log(req.body.username)
	console.log(req.body.password)
	console.log(req.body.code)
	console.log(req.body.icode)

	for(var i=0;i<User.length;i++){
		if(User[i].name === req.body.username){
			if(User[i].password == req.body.password){
				flag = true;
			}
		}
	}

	if(req.body.code !== req.body.icode){
		msg.message = '验证码错误！';
		msg.status = 0;
		res.send(msg);
	
	}

	if(!flag){
		msg.message = '用户名或密码错误！';
		msg.status = 0;
		res.send(msg);

	}

	if(flag && req.body.code === req.body.icode){
		res.send(msg)
	}
	
})

module.exports = router;
