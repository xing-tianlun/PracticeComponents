const express = require('express');
var router = express.Router();
let svgCaptcha=require('svg-captcha');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var URL = require('url');
var request = require('request');
var http = require('http');
var path = require('path');

router.use(bodyParser.urlencoded({ extended: false, limit: 2 * 1024, parameterLimit: 1000}));
// 启用cookie
router.use(cookieParser());

var corsOptions = {
  origin: 'http://192.168.40.175:8000',
  //这一项是为了跨域专门设置的
  credentials: true,
  maxAge: '1728000'
}
//注册跨域中间件
router.use(cors(corsOptions))

// 创建一个验证码
router.get('/verifyCode',(req,res) => {
	res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Allow-Origin", "http://192.168.32.120:8000");
	// 创建验证码
	var captcha = svgCaptcha.create({
		color : true,//彩色
		//inverse:false,// 反转颜色
		width : 100,//宽度
		height : 40,//高度
		fontSize:48,// 字体大小
		size : 4,// 验证码的长度
		noise : 3,// 干扰线条
		ignoreChars : '0oO1ilI'// 验证码字符中排除 0o1i
	});

	// console.log(captcha.data); svg 直接输出到页面
    // session里面也放一份
    req.session = captcha.text.toLowerCase();
    // cookie放一份
    res.cookie('captcha',req.session);
   // console.log(req.session)
    //res.send(captcha.data);
    res.send({
    	data : captcha.data,
    	code : req.session
    });
    // 往session，cookie中都存入一个验证码，并且把验证码显示在页面上
})

module.exports = router;

