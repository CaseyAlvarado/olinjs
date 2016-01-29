var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var LINQ = require('../linq/linq.js'); 


var possibleNames = ['Radmer', 'Sam', 'Whiskers', 'William Shakespeare', 'Mr. Tabby'];
var possibleColors = ['red', 'blue', 'mud colored', 'green', 'poop']; 

function randomIntGenerator(min, max){ 
    return Math.floor(Math.random()*(max -min)) + min; 
} 

function checkIfSorted(array){ 
  var sorted; 
  for (var c = 1; c < array.length; c++){ 
    if (array[c-1].age > array[c].age){ 
      return sorted = false;  
    }
  }
  return sorted = true; 
}

function sortCatsByAge(arrayOfCatObjects)
{ 
  for (var i = 1; i < arrayOfCatObjects.length; i++){ 
    if (arrayOfCatObjects[i-1].age > arrayOfCatObjects[i].age){ 
      var temp = arrayOfCatObjects[i-1]; 
      arrayOfCatObjects[i-1] = arrayOfCatObjects[i]; 
      arrayOfCatObjects[i] = temp; 
    }
  }
  return arrayOfCatObjects; 
}

function recurseToSort(arrayOfCatObjects){
  var sorted = checkIfSorted(arrayOfCatObjects); 
  if (sorted){ 
    return arrayOfCatObjects
  }
  else if (!sorted){
    var sortedCats = sortCatsByAge(arrayOfCatObjects); 
    return recurseToSort(sortedCats); 
  }
}

function filterCatsByColor(color, arrayOfCatObjects)
{
  var newArray = [];   
  arrayOfCatObjects.forEach(function(cat){ 
    if (cat.color == color){ 
      newArray.push(cat); 
    }
  }); 
  return newArray; 
}

function findCatIndex(cat, arrayOfCats){ 
  for (var j = 0; j < arrayOfCats.length; j++){ 
    if((cat.age == arrayOfCats[j].age) && (cat.name == arrayOfCats[j].name) && (cat.color == arrayOfCats[j].color)){ 
      return j; 
    }
  }
}

function Cat(){
  var cat = {
    age: randomIntGenerator(0, 100),
    name: possibleNames[randomIntGenerator(0, (possibleNames.length -1))],
    color: possibleColors[randomIntGenerator(0, (possibleColors.length -1))]
  };
  return cat;
}

var home = function (request, response){
  response.render('home', {"message": "Welcome to the cat app!"});
}

var newCat = function (request, response){
  var kitten = new Cat(); 
  db.add(kitten);
  response.render('newcat', {"catinfo": {age: kitten.age, name: kitten.name, color: kitten.color}});
}

var cats = function (request, response){  
  var sortedCats = recurseToSort(db.getAll()); 
  response.render('cats', {"cat" : sortedCats}); 
}

var bycolor = function (request, response){
  var color = request.params.color.split(':')[1];  
  var filteredArray = filterCatsByColor(color, db.getAll()); 
  var catsSortedByAge = recurseToSort(filteredArray); 
  response.render('sortedbycolor', {'catinformation': {color: color, cat:catsSortedByAge}});
}

var killcat = function(request, response){
  var orderedCats = recurseToSort(db.getAll());
  var index = findCatIndex(orderedCats[orderedCats.length -1], db.getAll()); 
  var kittens = db.getAll(); 
  var kittenKilled = kittens[index]
  db.remove(index); 
  response.render('deletedcat', {'catinformation': {age: kittenKilled.age, name: kittenKilled.name, color: kittenKilled.color}}); 
}

module.exports.home = home;
module.exports.newCat = newCat; 
module.exports.cats = cats; 
module.exports.bycolor = bycolor; 
module.exports.killcat= killcat; 
