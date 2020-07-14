const request = require('request');
const cheerio = require('cheerio');

//const CrontabPeriod = 60 * 5 // 五分鐘抓一次
const CrontabPeriod = 60 * 60 * 24 * 3

request('https://www.ptt.cc/bbs/CodeJob/index.html', (err, res, body) => {
  var $ = cheerio.load(body)

  // 抓取文章列表
  
  var list = $('.r-ent a').map((index, obj) => {
    return {
      title: $(obj).text(),
      link: $(obj).attr('href'),
      timestamp: $(obj).attr('href').substr(15, 10),     
    }
  }).get()
  //console.log(list[0].title)
  /*
  var date = $('.date').map((index,obj)=>{
   return{
     title: $(obj).text()
   }
 }).get()
  console.log(list.length)
  for(var i = 0; i < 19; i++){
    console.log(date[i])
  }
  */

  // filter 時間
  
  list = list.filter((el)=>{
    //return el.timestamp > (Date.now() / 1000 - CrontabPeriod)
    return el.timestamp > (Date.now()/1000 - CrontabPeriod)
  })
  console.log(list)
})