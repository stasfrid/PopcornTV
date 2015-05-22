var images = require("images");

function generateFanart(imdb, callback){
	var fs = require('fs');
	if (fs.existsSync('assets/cache/' + imdb + '.jpg')) {
		console.log('Fanart already downloaded, serving.');
   		 callback('cache/' + imdb + '.jpg');
  	} else {
		var API = require('./MoviesAPI');
  	 	var movies = API.getFanart(imdb, function(url){
    		var http = require('https');	

			var file = fs.createWriteStream("tmp.jpg");
			var request = http.get(url, function(response) {
  				response.pipe(file);
  				file.on('finish', function(){
  					images('tmp.jpg').resize(1920,1080).draw(images('assets/thumbnails/gradient_1080.png'),0,0).save('assets/cache/' + imdb + '.jpg');
  					callback('cache/' + imdb + '.jpg');
  				fs.unlink('tmp.jpg');
  				}); 
			});
    	});
	}
}

exports.generateFanart = generateFanart;