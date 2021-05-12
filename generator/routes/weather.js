var express = require('express');
var router = express.Router();
var User = require('./user');
var bodyParser = require('body-parser');
var URL = require('url');
var request = require('request');
var http = require('http');

router.get('/weather', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query)//{ name: '123', age: '35' }
  let body = '';
  let res_data;
  http.get(url = 'http://www.weatherol.cn/api/home/getCurrAnd15dAnd24h?cityid=' + req.query.code, (response) => {
    response.on('data', (data) => {
      body += data;
    }).on('end', () => {
      res_data = JSON.parse(body)
      console.log(res_data)
      res.send(res_data);
    })
  })

})
//景区 name为汉字
router.get('/scenicArea', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query)//{ name: '123', age: '35' }
  let body = '';
  let res_data;
  http.get(url = 'http://www.weatherol.cn/api/d3a/getD3aJQStationByName?name=' + req.query.name, (response) => {
    response.on('data', (data) => {
      body += data;
    }).on('end', () => {
      res_data = JSON.parse(body)
      //console.log(res_data)
      res.send(res_data);
    })
  })

})
//机场 name为汉字
router.get('/airport', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.query)//{ name: '123', age: '35' }
  let body = '';
  let res_data;
  http.get(url = 'http://www.weatherol.cn/api/getAirportStationByName?name=' + req.query.name, (response) => {
    response.on('data', (data) => {
      body += data;
    }).on('end', () => {
      res_data = JSON.parse(body)
      //console.log(res_data)
      res.send(res_data);
    })
  })

})

module.exports = router;

