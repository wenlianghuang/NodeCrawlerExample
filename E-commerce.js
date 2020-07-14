const request = require('request');
const cheerio = require('cheerio');
const async = require('async');


getTotal((pages) => {
  console.log(pages)
  async.map(pages, (page, callback) => {
    getPageProducts(page, (products) => {
      callback(null, products)
    })
  }, (err, results) => {
    console.log([].concat.apply([], results));
  })
})

function getTotal(callback) {
  request('https://tw.mall.yahoo.com/search?sid=jiaying5328', (err, res, body) => {
    var $ = cheerio.load(body)
    var total = $('#ypssnav strong').text()
    var pages = Math.ceil(total / 48)
    //callback(Array.from(new Array(pages), (val, index) => index))
    callback(Array.from(new Array(pages),(value,index)=>index))
  })
}


function getPageProducts(page, callback) {
  request(`https://tw.mall.yahoo.com/search?sid=jiaying5328&b=${page * 48}`, (err, res, body) => {
    var $ = cheerio.load(body)
    //'$'在此是tr的主軸，其他的td如果要找的話，要看是在前(prev)，還是在後(next)
    var products = $('tr.border').map((index, obj) => {
      return {
        title: $(obj).prev().prev().find('.title').text(),
        image: $(obj).prev().prev().find('img').attr('src'),
        price: $(obj).prev().find('em').text(),
        link: $(obj).prev().prev().find('.title a').attr('href'),
        /*list: $(obj).prev().find('li.strnme').text(),
        我本來想去找他的"購買人次"，可是他li的class不知道是什麼，所以就沒辦法爬到
        */
      }
    }).get()
    callback(products)
  })
}