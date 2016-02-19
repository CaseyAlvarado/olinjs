var mongoose = require('mongoose'); 

var ingredientSchema = mongoose.Schema({ 
	name: String, 
	price: Number, 
	outOfStock: Boolean

}, {'collection': 'ingredients' }); 

module.exports = mongoose.model('ingredients',  ingredientSchema); 