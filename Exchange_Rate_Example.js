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

  /*
  Remove the value in the array's index '-'
  */
  var indexs = []
  //var testindex = [0,1,2,3,'-',5,6,'-',8,9,'-',11]
  var indexVal = 0;
  var i = -1

  /*
  Check if the '-' is existed and keep going until there is no '-' value
  */
  while((rate.indexOf('-',i+1)!=-1)){
    indexVal = rate.indexOf('-',i+1)
    indexs.push(indexVal)
    i = indexVal
  }
  
  //console.log(indexs)
  
  var KeepCheckingValue = 0
  for(var i in indexs){
    rate.splice(indexs[i]-KeepCheckingValue,1)
    KeepCheckingValue += 1
  }
  console.log(rate)

})

function getData(callback) {
  request('https://rate.bot.com.tw/xrt?Lang=zh-TW', (err, res, body) => {
    callback(body)
  })
}