var express = require('express');
var router = express.Router();
var User = require('./user');
var bodyParser = require('body-parser');
var URL = require('url');
var request = require('request');
var http = require('http');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getUserInfo',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	var user = new User();
	var params = URL.parse(req.url,true).query;
	if(params.id == 1){
		user.name = 'ligh';
		user.age = 1;
		user.city = '北京';
	}else{
		user.name = 'sprig';
		user.age = 2;
		user.city = '杭州市'
	}
	res.send(user)
})

router.get('/weather',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query)//{ name: '123', age: '35' }
	let body = '';
	let res_data;
	http.get(url='http://v.juhe.cn/toutiao/index?type=top&key=19da4a0dd44e7a5b359745ea5163a168',(response) => {
		response.on('data',(data) => {
			body += data;
		}).on('end',() => {
			res_data = JSON.parse(body)
			//console.log(res_data)
			res.send(res_data);
		})
	})
	
})

router.get('/wea',function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req.query)//{ name: '123', age: '35' }
	let body = '';
	let res_data;
	http.get(url='http://v.juhe.cn/toutiao/index?type=top&key=19da4a0dd44e7a5b359745ea5163a168',(response) => {
		response.on('data',(data) => {
			body += data;
		}).on('end',() => {
			res_data = JSON.parse(body)
			
			//res.send(res_data);
			res.send(req.query.callback+'('+body+')');
		})
	})
	
})



module.exports = router;
