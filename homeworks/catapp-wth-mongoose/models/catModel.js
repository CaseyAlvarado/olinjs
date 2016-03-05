//this is the cat schema 

var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	age: Number, 
	name: String, 
	color: String
}, {'collection' : 'cats'}); 

//The first arguement here specifies the singular name of the collection mongoose is going to use so here it should be cat, I don't think you need to set it up above. You can find more here: http://mongoosejs.com/docs/models.html
module.exports = mongoose.model('cats',  catSchema)
