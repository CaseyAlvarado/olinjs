var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var mongoose = require('mongoose');

var catModel = require('../models/catModel');

var possibleNames = ['Radmer', 'Sam', 'Whiskers', 'William Shakespeare', 'Mr. Tabby', 'Purrty'];
var possibleColors = ['red', 'blue', 'mud colored', 'green', 'poop', 'yellow', 'polka dot']; 

var cats = mongoose.model('cats', catModel.catSchema);

function randomIntGenerator(min, max){ 
    // input: min and max number 
    // output: integer random number between min and max 

    return Math.floor(Math.random()*(max -min)) + min; 
} 

function Cat(){
  //input: - 
  //output: an "instance" of the Cat class with random values for age, name, and color

  //make a new cat with a random age from 0 to 100, random name from possble names, and random name from possible colors
  var cat = {
    age: randomIntGenerator(0, 100),
    name: possibleNames[randomIntGenerator(0, (possibleNames.length -1))],
    color: possibleColors[randomIntGenerator(0, (possibleColors.length -1))]
  }; 
  return cat;
}

var home = function (request, response){
  //input: request, response 
  //output: -- instead renders welcome message 
  response.render('home', {"message": "Welcome to the cat app!"});
}

var newCat = function (request, response){
  //input: request, response 
  //output: renders information about new cat to the screen 

  //make a new cat
  var kitten = new Cat(); 

  //add and save new cat to the cats database with cat schema
  var cats = mongoose.model('cats', catModel.catSchema);
  var cat = new cats({age: kitten.age , name: kitten.name, color: kitten.color});
  cat.save(function (err) {
  if (err) {
    console.log("Problem saving cat", err);
  }
  });
  response.render('newcat', {"catinfo": {age: kitten.age, name: kitten.name, color: kitten.color}});
}

var catSort = function (request, response){  
  //input: request, response
  //output: renders sorted list of cats to the screen 

  //find all cats sorted with decreasing age. 
  var sortedCatttss = cats.find({}, function(err, cat){ 
    if (err){ 
      console.log(err); 
    }

    response.render('cats', {"cats" : cat});
  }).sort({age: -1});    
}

var bycolor = function (request, response){
  //input: request, response 
  //output: -- renders filtered, sorted list of cats to the screen

  //split off the ":" in front of the color 
  var colorRequested = request.params.color;

  //find the cats that have the specified color and sort the filtered cats by decreasing age
  cats.find({color : colorRequested}, function(err, cats){
    if(err){ 
      console.log(err); 
    } 
    response.render('sortedbycolor', {'catinformation': {color: colorRequested, cat:cats}});
  }).sort({age: -1}); 
}

var killcat = function(request, response){
  //input: request, response 
  //output: --renders information about the deleted cat to the screen

  //sort the cats by decreasing age, and with all conditions delete the cat. If error, then say that cat could not be deleted. 
  cats.findOneAndRemove('', {sort: {age: -1}})
      .exec(function(err, cat){ 
          if(err){ 
            console.log("Could not delete cat", err); 
          }
          response.render('deletedcat', {'catinformation': {age: cat.age, name: cat.name, color: cat.color}}); 
  }); 
}

var partialSearch = function(request, response){
  //input: request, response
  //output: --renders the cats sorted by age that match the partial names

  var partialNameRequested = request.params.name;

  var regex = new RegExp(partialNameRequested, "i"); 
  cats.find({name: regex}, function(err, cats){
    console.log(cats); 
    response.render('namesearch', {'searchresult': {query: partialNameRequested, catResults: cats}}); 
  }).sort({age: -1}); 
}

module.exports.home = home;
module.exports.newCat = newCat; 
module.exports.cats = catSort; 
module.exports.bycolor = bycolor; 
module.exports.killcat= killcat; 
module.exports.partialSearch = partialSearch; 