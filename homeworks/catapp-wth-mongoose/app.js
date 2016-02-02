var exphbs = require('express-handlebars');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var express = require('express');
var index = require('./routes/catappindex')
var app = express();



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://localhost/AllDaCats');

app.get('/', index.home);
app.get('/new', index.newCat); 
app.get('/cats', index.cats); 
app.get('/cats/bycolor/:color', index.bycolor); 
app.get('/cats/delete/old', index.killcat);
app.get('/cats/searchname/:name', index.partialSearch); 

app.listen(3002);