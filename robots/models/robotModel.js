//This type of file is usually found in app/models/robotModel.js
var mongoose = require('mongoose');

// Create a Schema
var robotSchema = mongoose.Schema({
  name: String,
  abilities: [String],
  isEvil: Boolean
}, {'collection': 'user'});

module.exports = mongoose.model("user", robotSchema);