var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase'); 


var possibleNames = ['Radmer', 'Sam', 'Whiskers', 'William Shakespeare', 'Mr. Tabby'];
var possibleColors = ['red', 'blue', 'mud colored', 'green', 'poop']; 

var Robot = require('../models/robotModel.js');



var home = function (request, response){
  var robotCollection; 
  Robot.find({}, function(err, robots){
    console.log(robots[0].name);
    response.render('robots', {'robotcollection' : robots});
  });
  
}

module.exports.home = home;

