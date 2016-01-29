
var home = function(req, res){
  res.render('home', {"classes": [
  	{name : "Olin.js", teacher: "not me"},
  	{name : "Circuits", teacher: "Bradley Minch"}, 
  	{name : "Markanics", teacher: "Mark"}]
	});
};

module.exports.home = home;