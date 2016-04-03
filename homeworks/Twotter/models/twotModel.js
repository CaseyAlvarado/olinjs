var mongoose = require('mongoose'); 
//would be cool to use refrencing of docs here
var twotSchema = mongoose.Schema({  
	name : String,
	text : String, 
	dateTime : String,  
	madeByUser: Boolean

}, {'collection': 'twots'}) 

module.exports = mongoose.model('twots', twotSchema); 


