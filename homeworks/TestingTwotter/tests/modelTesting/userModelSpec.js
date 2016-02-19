require('../../app'); 
var expect = require('chai').expect;
var users = require('../../models/userModel');

describe('User Model', function() {

  it('should create a new user', function(done) {
    var user = new users({
      oauthID: 12345,
      name: "Casey",
      created: Date.now()
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should delete the Casey user', function(done) {
    users.remove({name : "Casey"}, function(err){
      if(err){ 
        return done(err);
      } 
      done(); 
    })
  });

    it('should find the Casey user', function(done) {
    users.find({name : "Casey"}, function(err){
      if(err){ 
        return done(err);
      } 
      done(); 
    })
  });

});