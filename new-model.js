
var mydata = require('./hello-world.js'); 

mydata(process.argv[2], process.argv[3], function(err, listOfPaths)
{ 
		for(var k = 0; k < listOfPaths.length; k++)
		{ 
			console.log(listOfPaths[k]);
		}
});  





  Here's the official solution in case you want to compare notes:  
   
 ─────────────────────────────────────────────────────────────────────────────  
  _/usr/lib/node_modules/learnyounode/exercises/make_it_modular/solution/sol  
  ution.js_ :  
   
     var filterFn = require('./solution_filter.js')  
     var dir = process.argv[2]  
     var filterStr = process.argv[3]  
       
     filterFn(dir, filterStr, function (err, list) {  
       if (err)  
         return console.error('There was an error:', err)  
       //here below they made a seperate function in order to be able to do for each file 
       //in the list
       //this is like linq where you make a new object to call temporarily and manipulate
       list.forEach(function (file) {  
         console.log(file)  
       })  
     })  
   
 ─────────────────────────────────────────────────────────────────────────────  
  _/usr/lib/node_modules/learnyounode/exercises/make_it_modular/solution/sol  
  ution_filter.js_ :  
   
     var fs = require('fs')  
     var path = require('path')  
       
     module.exports = function (dir, filterStr, callback) {  
       
       fs.readdir(dir, function (err, list) {  
         if (err)  
           return callback(err)  
       
         list = list.filter(function (file) {  
           return path.extname(file) === '.' + filterStr  
         })  
       
         callback(null, list)  
       })  
     }  