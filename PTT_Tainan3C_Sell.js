const request = require('request');
const cheerio = require('cheerio');
const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    getItems((items)=>{
        res.json(items)
    });
}).listen(3000)

function getItems(callback){
    request('https://www.ptt.cc/bbs/Tainan/M.1388172150.A.860.html',(err,res,body)=>{
        var $ = cheerio.load(body,{ decodeEntities: false});
        var items = [];

        $('div.push').each((index,obj)=>{
            var seller = $(obj).find('.push-userid').html();
            var content = $(obj).find('.push-content').html().replace(': ','');
            var time = $(obj).find('.push-ipdatetime').html().replace('\n','');
            if(items.length && seller === items[items.length-1].seller){
                items[items.length-1].content = items[items.length-1].content+content
            }
            else{
                items.push({
                    seller: seller,
                    content: content,
                    time: time
                })
            }
        })
        callback(items);
    })
}