//learn node now
//console.log('HELLO WORLD'); 

// console.log(process.argv); 
// var sum = 0; 
// for(var k = 2; k < process.argv.length; k ++){
// 	sum+= Number(process.argv[k]); 
// }
// console.log(sum); 

var fs = require('fs');

//synchronously
// var bufferObject = fs.readFileSync(process.argv[2]); 
// var string = bufferObject.toString(); 
// var arrayOfStrings = string.split('\n'); 
// console.log(arrayOfStrings.length -1); 

//Asynchronously 

	// fs.readFile(process.argv[2], function doneReading(err, fileContents) { 
	// 	var arrayOfStrings = fileContents.toString().split('\n'); 
	// 	console.log(arrayOfStrings.length -1); 
	// }); 
// var path = require('path'); 
// fs.readdir(process.argv[2], function callback(err, list)
// { 
// //list is an array of filename string
// 		list.filter(function checkExt(pathName)
// 		{
// 			// console.log(pathName); 
// 			var extension = path.extname(pathName).split("."); 
// 			// console.log(process.argv[3]); 
// 			// console.log(extension[extension.length-1]); 
// 			// console.log(extension[extension.length-1] == process.argv[3]);
// 			if (extension[extension.length-1] == process.argv[3]){
// 			// console.log("in if statement");  
// 				console.log(pathName); 
// 			}
// 		})
// }); 


module.exports = function filterList(directory, ext, callback) 
{ 
	var list = []; 
	var path = require('path'); 
	fs.readdir(directory, function (err, files)
	{ 
		if (err){ 
			// console.log("there was an error."); 
			return callback(err); 
		}
		else
		{
		//list is an array of filename string
			files.forEach(function (pathName)
			{
				var extension = path.extname(pathName).split("."); 
				// console.log(ext); 
				// console.log(extension[extension.length-1]); 

				if (extension[extension.length-1] === ext) 
				{
					list.push(pathName);  
				}
			}); 
			callback(null, list); 
		}
	}); 
}






