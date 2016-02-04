var express = require('express'); 
var router = express.Router()
var mongoose = require('mongoose'); 

var ingredientModel = require('../models/ingredientModel');

var ingredients = mongoose.model('ingredients', ingredientModel.ingredientSchema);

routes = {}; 

var home = function (request, response){
  //input: request, response 
  //output: -- instead renders welcome message 
  response.render('home', {"message": "Welcome to the burger app, yumm!"});
}

var getIngredients = function(callback){ 
	ingredients.find({}, function(err, allIngredients){
		if (err){ 
			console.log(err); 
		}
		console.log(allIngredients); 
		return callback(allIngredients); 
	}); 
}

var addIngredient = function(request, response){
	var params = request.body; 
	var newIngredient = new ingredients({name: params.name, price: params.price, outOfStock: params.outOfStock}); 
	newIngredient.save(function(err){ 
		console.log("there was a problem saving the new ingredient", err); 
	})
	console.log(newIngredient); 
}

routes.updateIngredient = function(params){
	var queryName = params.name; 
	var updatedQuantity = params.quantity; 
	ingredients.findOneAndUpdate(queryName, {$set: {quantity: updatedQuantity}}, function(err){ 
		console.log("there was been an error updating", err); 
	}); 
},


routes.getIngredientsGET = function(request, response){ 
	getIngredients(function(allIngredients){
		console.log(allIngredients);
		response.render('ingredients',  {'is' : allIngredients}); 
	});
}

routes.addIngredientPOST = function(request, response){ 
	if(request.xhr){ 
		console.log(request.body); 
		addIngredient(request, response); 
		response.end('.'); 
	}
}

// routes.updateIngredientsPOST = function(request, response){ 
// 	if(request.xhr){ 
// 		console.log(request.body); 
// 		upgradeIngredient(request.body); 
// 		response.end('.');
// 	}
// }


module.exports = routes;