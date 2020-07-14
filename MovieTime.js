const request = require('request');
const cheerio = require('cheerio');


getFilmIdAndName((filmId,filmName) => {
  
  for(var i=0;i<filmId.length;i++){
    filmId[i] = filmId[i].split("/",3)
    filmId[i] = filmId[i][2]
  }
  //console.log(filmName)
  //var filmFinalId = filmId[1]
  //console.log(filmFinalId)
  filmInputName = process.argv[2]
  var index
  for(var i=0;i<filmName.length;i++){
    if(filmName[i] == filmInputName){
      index = i
    }
  }
    console.log(index)
    var filmFinalId = filmId[index]
    console.log(filmFinalId)
    getMovieTimes(filmFinalId, 'a02', (times) => {
      
      console.log(times);
    })
  })

 

  //首輪目前上映的電影Identifaction & Name
  function getFilmIdAndName(callback) {
    request('http://www.atmovies.com.tw/movie/now', (err, res, body) => {
      var $ = cheerio.load(body)
      const filmId = []
      const filmName = []
      //searching all the element(each) in the class="filmListPA", and then grab all the 
      //href(url) to the array "filmId"
      $('.filmListPA a').each((i,ele)=>{
        filmId.push($(ele).attr('href'))
        filmName.push($(ele).text())
      })
      
      callback(filmId,filmName)
    })
  }

function getMovieTimes(filmId,cityId,callback){
  
    var url = 'http://www.atmovies.com.tw/showtime/' +filmId+'/'+cityId+'/'
    request(url,(err,res,body)=>{
        var d = new Date();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var $ = cheerio.load(body);
        
        var times = $('#filmShowtimeBlock li')
                   .filter((index,obj)=>{
                        var time = $(obj).text().split('：');
                        return time[0]*60+time[1]*1 > hour*60+minute*1
                    })
                    .map((index,obj)=>{
                        return{
                            time: $(obj).text(),
                            theater: $(obj).closest('ul').find('.theaterTitle').text()
                        }
                    })
                    .get()
                    .sort((a,b)=>{
                        var a = a.time.split(':');
                        var b = b.time.split(':');
                        return a[0]*60+a[1]*1 > b[0]*60+b[1]*1;
                    })
        
       callback(times);
    })
  
}
