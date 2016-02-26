var mongoose = require('mongoose'); 

var toDoSchema = mongoose.Schema({ 
	text: String, 
	done: Boolean, 
	editorEnabled: Boolean

}, {'collection': 'toDos' }); 

module.exports = mongoose.model('toDos',  toDoSchema); 