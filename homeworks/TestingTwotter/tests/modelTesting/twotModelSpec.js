require('../../app'); 
var expect = require('chai').expect;
var twots = require('../../models/twotModel');

describe('Twot Model', function() {
  it('should create a new twot', function(done) {

    var twot = new twots({
      name: 'Anne',
      text: "I try",
      date: Date.now(),
      madeByUser: Boolean
    });
    twot.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  it('should delete the Anne twot', function(done) {
    twots.remove({name : "Anne"}, function(err){
      if(err){ 
        return done(err);
      } 
      done(); 
    })
  });

  it('should find the Anne twot', function(done) {
    twots.find({name : "Anne"}, function(err){
      if(err){ 
        return done(err);
      } 
      done(); 
    })
  });

});
