var express = require('express'); 
var router = express.Router(); 
var mongoose = require('mongoose'); 

var twotModel = require('../models/twotModel');
var twots = mongoose.model('twots', twotModel.twotSchema);

var userModel = require('../models/userModel');
var users = mongoose.model('users', userModel.userSchema);

routes = {}; 

routes.login = function(request, response){ 
	//Input: request, response objects for get request
	//Output: --. renders log in page 
	response.render('login'); 
},

routes.addNewTwotPOST = function(req, res)
{ 	//Input: request, response object function
	//Output: sends newTwot back to client side 
	if(req.xhr){ 
		//saving new twot
		var newTwot = new twots({name: req.user.name, text: req.body.twot, date: Date.now()})
		newTwot.save(function(err){ 
			if(err){ 
				console.log("There has been an error saving the twot", err); 
			}
		})
		res.send(newTwot); 
	}
},

routes.twotsFeedGET = function(request, response){
	//Input: request, response object
	//Output: renders response object, with the provided infornation of all the twots, the current user, authentication permission, and all the other users ever
	var name; 
	var authenticated;  
	//check if this user is authenticated 
	if(request.isAuthenticated()){ 
		name = request.user.name
		authenticated = true; 
	}
	else { 
		name = 'Rando User'; 
		authenticated = false; 
	}

	//find all twots, sort them by decreasing datetime
	twots.find({}).sort({dateTime : -1}).exec(function(err, allTwots){
		if (err){ 
			console.log("There has been a problem displaying all of the twots", err)
		}

		//for each twot, check if this twot was made by the user. If yes, fill madeByUser boolean in the object to true. 
		//Otherwise, fill to false. This is to know which tweets the user can delete
		allTwots.forEach(function(item){ 
			if(item.name === name){ 
				item.madeByUser = true; 
			}
			else{ 
				item.madeByUser = false; 
			}
		})
		//find all other users distinct by name
		twots.find({name : {$ne: name}}).distinct('name').exec(function(err, notThisUser){ 
			response.render('newsfeed', {twot: allTwots, user: request.user, a: authenticated, allTheUsers: notThisUser}); 
		})
	})
},

routes.deleteTwotPOST = function(request, response){ 
	//Input: request, response object
	//Output: --, if ajax request, find and remove a twot by id
	if(request.xhr){ 
		twots.findByIdAndRemove({_id: request.body.id}) 
		response.send('.'); 
	}
},

routes.logOut = function(request, response){ 
	//Input: request, response object
	//Output: --, redirect to twotsfeed page upon logout. 
	if(request.xhr){ 
		request.logout();
  		response.redirect('/twotsfeed');
	}
}
module.exports = routes; 