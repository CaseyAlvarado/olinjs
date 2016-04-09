var request = require('supertest');
var app = require('../../app.js');


// Nice architecture for all your test suites!
describe("Testing Twotter", function() {
  it('should return 200 OK on GET /login', function(done) {
    request(app)
      .get('/login')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
  
  it('should return 200 OK on GET /twotsfeed', function(done) {
    request(app)
      .get('/twotsfeed')
      .expect(200)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  }); 

  it('should return OK on GET /twotsfeed/logout', function(done) {
    request(app)
      .get('/twotsfeed/logout')
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  }); 

});
