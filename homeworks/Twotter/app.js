var exphbs = require('express-handlebars');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mongoose connections
var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/Twotter');
var userModel = require('./models/userModel');
var users = mongoose.model('users', userModel.userSchema);


var newsfeed = require('./routes/newsfeed')

var express = require('express');
var app = express();

//passport requirements 
var config = require('./oauth.js');
var session = require('express-session')
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var auth = require('./oauth');

//handlebars engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


//initialize a new facebook strategy that makes a new user if the user is new
passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    users.findOne({ oauthID: profile.id }, function(err, user) {
      if(err) {
        console.log(err);  // handle errors!
      }
      if (!err && user !== null) {
        done(null, user);
      } else {
        user = new users({oauthID: profile.id, name: profile.displayName, created: Date.now()});
        user.save(function(err) {
          if(err) {
            console.log(err);  // handle errors!
          } else {
            console.log("saving user ...");
            done(null, user);
          }
        });
      }
    });
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  users.findById(id, function(err, user){
    console.log(user);
      if(!err) done(null, user);
      else done(err, null);
    });
});

//path to account
app.get('/account', ensureAuthenticated, function(req, res){
  users.findById(req.session.passport.user, function(err, user) {
    if(err) {
      console.log(err);  // handle errors
    } else {
      res.render('account', { user: user});
    }
  });
});

app.get("/test", function(req, res) {
  res.send("LOL test\n");
});

//facebook autheorization callbacks. Failure, redirect to /login. Sucess, redirect to /twotsfeed
app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){});

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/twotsfeed');
  });


app.get('/twotsfeed', newsfeed.twotsFeedGET);
app.get('/login', newsfeed.login); 
app.post('/twotsfeed/addNewTwot', newsfeed.addNewTwotPOST);
app.post('/twotsfeed/delete', newsfeed.deleteTwotPOST); 
app.get('/twotsfeed/logout', ensureAuthenticated, newsfeed.logOut);

app.listen(2000);
console.log('Listening on Port 2000');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  else{ 
  	res.redirect("/login"); 
  }
}
