const request = require('request');
const cheerio = require('cheerio');

//Put this body html put it shows the 404...
//so there is no information to get the rate value.
getData((body) => {
  //console.log(body);
  var $ = cheerio.load(body)

  /*
  var rate = $('.rate-content-cash.text-right.print_table-cell')
    .filter((index) => {
      return index % 2 && index < 14
    })
    .map((index, obj) => {
      return $(obj).text()
    })
    .get()

  var lowest = Math.min(...rate)
  var gotoBackRightNow = (lowest == rate[0]) ? true : false
  console.log(gotoBackRightNow);
  */

  var rate = []
  $('.rate-content-cash.text-right.print_hide').each((i,ele)=>{
    rate.push($(ele).text())
  })
  console.log(rate.length)
})

function getData(callback) {
  request('https://rate.bot.com.tw/xrt?Lang=zh-TW', (err, res, body) => {
    callback(body)
  })
}