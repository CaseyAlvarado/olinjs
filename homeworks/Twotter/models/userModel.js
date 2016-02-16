var mongoose = require('mongoose'); 

var userSchema = mongoose.Schema({
  oauthID: Number,
  name: String,
  created: Date
}, {'collection' : 'users'});

module.exports = mongoose.model('users', userSchema)