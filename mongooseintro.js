//this usually goes in app/models/mongooseinto.js

var userSchema = mongoose.Schema({
  name: String,
  grade: String,
  class: Number
});

var User = mongoose.model('User', userSchema);
var bob = new User({name: 'bob', grade: 'A', class: '2013'});
bob.save(function (err) {
  if (err) {
    console.log("Problem saving bob", err);
  }
});

User.find({name: 'bob'})
  .sort({grade: -1})
  .exec(function(err, users) {
    console.log(users);
  });