var http = require('http');
var fs = require('fs'); 
// var server = http.createServer(function(req, res){ 

	//serves same text file for each request it recieves 


// 	var readStream = fs.createReadStream(process.argv[3]); 
// 	readStream.on('open', function(){ 
// 		readStream.pipe(res); 
// 	})
// }); 
// server.listen(process.argv[2]);  

//  Here's the official solution in case you want to compare notes:  
   
//  ─────────────────────────────────────────────────────────────────────────────  
   
//      var http = require('http')  
//      var fs = require('fs')  
       
//      var server = http.createServer(function (req, res) {  
//        res.writeHead(200, { 'content-type': 'text/plain' })  
       
//        fs.createReadStream(process.argv[3]).pipe(res)  
//      })  
       
//      server.listen(Number(process.argv[2]))  
   


// \

// var server = http.createServer(function(request, response){ 
// 	var incomingData = "";  
// 	request.on('data', function(chunk){ 
// 		console.log(chunk.toString());
// 		incomingData += chunk.toString().toUpperCase(); 
// 		console.log(incomingData); 
// 	}); 
// 	request.on('end', function(chunk){ 
// 		response.end(incomingData); 
// 	})
// 	// var readStream = fs.createReadStream(incomingData);
// 	// readStream.on('open', function(){ 
// 	// 	readStream.pipe(res); 
// 	// })
// }); 
// server.listen(process.argv[2]); 




const url = require('url');
const net = require('net'); 

function unixTime(time){
	return {unixTime : time.getTime()} 
}

function isoTime(time){ 
	var JSONDateObject = {'hour': time.getHours(), 
							'minute':time.getMinutes(), 
							'second':time.getSeconds()}
	return JSONDateObject; 
}

var server = http.createServer(function(request, response){ 
	var incomingData = ""; 
	var urlContent = url.parse(request.url, true); 
	var time = new Date(urlContent.query.iso);
	var out; 
	if (urlContent.pathName == '/api/parsetime'){ 
		out = isoTime(time); 
	}
	else 
	{ 
		out = unixTime(time);
	}

	response.end(JSON.stringify(time)); 
	response.writeHead(200, { 'Content-Type': 'application/json' });  
	// var readStream = fs.createReadStream(incomingData);
	// readStream.on('open', function(){ 
	// 	readStream.pipe(res); 
	// })
}); 
server.listen(process.argv[2]); 