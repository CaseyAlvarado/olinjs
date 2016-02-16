var mongoose = require('mongoose'); 

var twotSchema = mongoose.Schema({  
	name : String,
	text : String, 
	dateTime : String,  
	madeByUser: Boolean

}, {'collection': 'twots'}) 

module.exports = mongoose.model('twots', twotSchema); 


