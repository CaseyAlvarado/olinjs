var http = require('http');
var stream = require('stream'); 

// http.get(process.argv[2], function callback (response){ 
// 	response.on("data", function(data){ 
// 		console.log(data.toString()); 

// 	}); 
// }); 


// http.get(process.argv[2], function callback (response){ 
// 	var output = ""; 
// 	response.on("data", function(data){
// 		output += data.toString();   
// 	}); 
// 	response.on("end", function(){
// 		console.log(output.length);
// 		console.log(output);  
// 	}); 
// }); 
// var list = []; 
// var output1 = ""; 
// var done1; 
// http.get(process.argv[2], function callback (response){
// 	response.on("data", function(data){
// 		output += data.toString();   
// 	}); 
// 	response.on("end", function(data){
// 		output += data.toString();   
// 	}); 
// }); 

// http.get(process.argv[3], function callback (response){

// }); 

// http.get(process.argv[4], function callback (response){

// }); 

var results = []; 
var counter = 0; 
var output1 = ""; 
var output2 = ""; 
var output3 = ""; 


http.get(process.argv[2], function (response){
	
	response.on("data", function(data){
		output1 += data.toString();    
	}); 
	response.on("end", function(data){
		counter +=1; 
		if (counter ==3){ 
			printing(); 
		}
	}); 
}); 


http.get(process.argv[3], function (response){
	
	response.on("data", function(data){
		output2 += data.toString();    
	}); 
	response.on("end", function(data){
		counter +=1; 
		if (counter ==3){ 
			printing(); 
		}
	}); 
}); 


http.get(process.argv[4], function (response){
	
	response.on("data", function(data){
		output3 += data.toString();    
	}); 
	response.on("end", function(data){
		counter +=1; 
		if (counter ==3){ 
			printing(); 
		}
	}); 
}); 



function printing(){
	console.log(output1); 
	console.log(output2); 
	console.log(output3);
	 
}

// something(printing); 


  Here's the official solution in case you want to compare notes:  
   
 ─────────────────────────────────────────────────────────────────────────────  
   
     var http = require('http')  
     var bl = require('bl')  
     var results = []  
     var count = 0  
       
     function printResults () {  
       for (var i = 0; i < 3; i++)  
         console.log(results[i])  
     }  
       
     function httpGet (index) {  
       http.get(process.argv[2 + index], function (response) {  
         response.pipe(bl(function (err, data) {  
           if (err)  
             return console.error(err)  
       
           results[index] = data.toString()  
           count++  
       
           if (count == 3)  
             printResults()  
         }))  
       })  
     }  
       
     for (var i = 0; i < 3; i++)  
       httpGet(i) 