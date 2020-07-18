const request = require('request')
const cheerio = require('cheerio')
const moment = require('moment')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

var data = {
    _csrf: "452ac0a0-cd9d-4dd8-ab31-7ef026f62e64",
    trainTypeList: "ALL",
    transfer: "ONE",
    startStation: "1000-臺北",
    endStation: "7380-四腳亭",
    rideDate: "2020/07/17",
    startTime: "17:00",
    endTime: "19:20",
}

var options = {
    url: 'https://www.railway.gov.tw/tra-tip-web/tip/tip001/tip112/querybytime',
    method: 'post',
    form: data
}

/*
var options = {
    url: 'https://www.railway.gov.tw/tra-tip-web/tip',
    method: 'GET',
}

request(options,(err,res,body)=>{
    var $ = cheerio.load(body)
    var list = []
    $('.container.list-tab li').each((i,ele)=>{

        list.push($(ele).text().replace(/\t/g,'').replace(/\n/g,''))
    })
    //console.log(body)
    console.log(list)
})
*/
request(options,(err,res,body)=>{
    var $ = cheerio.load(body)
    var list = []
    $('.trip-column td:not(.more):not(.check-way)').each((i,ele)=>{
        list.push($(ele).text())
    })
    var d = new Date();
    var hours = d.getHours();
    var minute = d.getMinutes();
    var endTimehour = options.form.endTime.split(":")[0]
    var endTimeminute = options.form.endTime.split(":")[1]
    var startTimehour = options.form.startTime.split(":")[0]
    var startTimeminute = options.form.startTime.split(":")[1]
    endTimehour = parseInt(endTimehour)
    endTimeminute = parseInt(endTimeminute)
    startTimehour = parseInt(startTimehour)
    startTimeminute = parseInt(startTimeminute)
    //console.log(endTimeminute)
    var startTotalSecondTime = startTimehour*3600 + startTimeminute*60
    var endTotalSecondTime = endTimehour*3600 + endTimeminute*60
    var nowTotalSecondTime = hours*3600 + minute*3600
    if(nowTotalSecondTime > startTotalSecondTime && nowTotalSecondTime < endTotalSecondTime){
        console.log("To notice the time of list")
    }
    else{
        console.log(hours+":"+minute+" Now is too early, keep working")
    }
    //console.log(list)
})

/*
const http = require('http')
const fs = require('fs')

const file = fs.createWriteStream("file.pdf")
const requestpdf = http.get('http://web.metro.taipei/timetables20200715/134c.pdf',function(response){
    response.pipe(file);
})
*/