var express = require('express')
var request=require('request');
var cheerio=require('cheerio');

var port = process.env.PORT || 3000;
var app = express();

app.get('/',function(req,res){
  res.charset='utf-8';
  request('http://www.baai.com/',function(err,response,body){
    if(!err && response.statusCode==200){
      $=cheerio.load(body); //当前$相当于整个body的选择器
      var proInfos=$('.pro-info>h4');
      var imgs=$('.pro-img>img');
      var imgsTemp=[],proInfosTemp=[];
      for(var i=0,len=imgs.length;i<len;i++){
        imgsTemp.push(imgs.eq(i).attr('data-original'));
        proInfosTemp.push(proInfos.eq(i).html());
      }
      res.json({
        'productImage':imgsTemp,
        'proInfosName':proInfosTemp
      });
    }
  });
});

app.listen(port)




