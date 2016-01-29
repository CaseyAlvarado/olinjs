
var home = function(req, res){
	var currenttime = new Date();
	var christmas = new Date("Dec 25");  
	if (currenttime == christmas){
		  res.render('home', {"display": "YES IT IS christmas"});

	}
	else 
	{ 
		res.render('home', {"display": "NO it is not christmas"});
	}
};

module.exports.home = home;