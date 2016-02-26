var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 

var toDoModel = require('../models/toDoModel');
var toDos = mongoose.model('toDos', toDoModel.toDoSchema);

var path = require('path'); 

routes = {}; 

var todosForButtons = function(request, response, callback){ 
	//Input: request, response, callback function 
	//Output: returns the todo items for each "tab" page. 

	//If we are on the "active to do items" page, then return all active to do items
	if(request.body.active){ 
		toDos.find({done : false}, function(err, activeToDos){ 
			if(err){ 
				response.send(err); 
			}
			return callback(activeToDos); 	
		})
	}
	//if we are on the "completed to do items page", then return all completed to do items only
	else if(request.body.completed){
		toDos.find({done: true}, function(err, completedToDos){ 
			if(err){ 
				response.send(err); 
			}
			return callback(completedToDos); 	
		})
	}
	//else, we are most likely on the "all to do items page", so return all the to do items
	else{ 
		toDos.find({}, function(err, allToDos){ 
			if(err){ 
				response.send(err); 
			}
			return callback(allToDos); 	
		})
	}
}

routes.getAllToDosGET = function(request, response){ 
	//Input: request, response objects 
	//Output: finds and sends a json object of all of the todo items 
	toDos.find({}, function(err, allToDos){ 
		if(err){ 
			console.log(err); 
		}
		response.json(allToDos); 
	})
},

routes.getActiveToDosGET = function(request, response){ 
	//Input: request, response objects
	//Output: returns in json format all active to do items
	toDos.find({done : false}, function(err, active){ 
		if(err){ 
			console.log(err); 
		}
		response.json(active); 
	})
},

routes.getCompletedToDosGET = function(request, response){
	//Input: request, response objects
	//Output: returns in json format all completed to do items 
	toDos.find({done : true}, function(err, completed){ 
		if(err){ 
			console.log(err); 
		}
		response.json(completed); 
	})
},

routes.addNewToDoPOST = function(request, response){ 
	//Input: request, response objects with new todo item information
	//Output: saves the new todo item and returns the todo items for the "page" of to do items currently displplayed using the button click
	
	//save new to do item
	var td = new toDos({text: request.body.todo.text, done: false, editorEnabled: false}); 
	td.save(function(err){ 
		if(err){ 
			console.log("there was a problem saving the new ingredient", err);
			response.send(errr);  
		}
		console.log("To do item was saved sucessfully.")	
	}); 

	//find out which todo items to send back, depending on the current page. 
	//e.g even though we added an active item, but we are on the completed page, we want to keep viewing the completed page
	todosForButtons(request, response, function(todos){ 
		response.json(todos); 
	})
	
}, 

//perhaps instead of removing them, set completed boolean to true and this will show all completed 
routes.deleteToDoPOST = function(request, response){ 
	//Input: request, response objects with todo item to delete
	//Output: finds to do item by id and removes the todo iteem 
	//returns the todo items for the "page" of to do items currently displplayed using the button click

	//remove to do item 
	toDos.findByIdAndRemove({_id: request.params.todo_id}, function(err, allToDos){ 
		if(err){ 
			console.log("There has been an error removing a todo item", err); 
		}
	})

	//find which to do items to display
	todosForButtons(request, response, function(todos){ 
		response.json(todos); 
	})
},

routes.toDoCompletedPOST = function(request, response){ 
	//Input: request, response objects with todo item to mark as completed
	//Output: updates to do item "done" field and 
	//returns the todo items for the "page" of to do items currently displplayed using the button click

	//update "done" field to true
	toDos.findByIdAndUpdate({_id : request.params.todo_id}, {$set: {done: true}}, function(err, todos){ 
		if(err){ 
			console.log("There has been an error", err); 
		}
	}); 

	//find out which to do items to display
	todosForButtons(request, response, function(todos){ 
		response.json(todos); 
	})
},

routes.editToDoPOST = function(request, response){ 
	//Input: request, response objects with todo item to mark as completed
	//Output: updates to do item edits and returns the newly edited to do item

	//update to do object
	toDos.findByIdAndUpdate({_id : request.params.todo_id}, {$set : {text : request.body.text}}, {'new' : true}, function(err, updatedTodo){ 
		if(err){ 
			console.log("there has been an error:", err); 
		}

		//responds with updated to do item 
		response.json(updatedTodo); 
	})
}, 

routes.catchAnything = function(request, response){ 
	//Input: request, response objects
	//Output: display that none of the routes match, but still caught somethign. 
	console.log('None of the routes match, but you appear to have catch something'); 
	response.sendfile('./views/index.html'); 
}

module.exports = routes;
