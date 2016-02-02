//this is the cat schema 

var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	age: Number, 
	name: String, 
	color: String
}, {'collection' : 'cats'}); 

module.exports = mongoose.model('cats',  catSchema)