var exphbs = require('express-handlebars');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 

mongoose.connect('mongodb://localhost/BurgerApp');

var express = require('express');
var ingredients = require('./routes/ingredients');
var order = require('./routes/order'); 
var kitchen = require('./routes/kitchen')
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/ingredients', ingredients.getIngredientsGET);
app.post('/ingredients/add', ingredients.addIngredientPOST);
app.post('/ingredients/edit', ingredients.updateIngredientsPOST); 
app.post('/ingredient/outOfStock', ingredients.updateStockPOST); 
app.get('/order', order.populateIngredientsGET); 
app.post('/order/addOrderPOST', order.addOrderPOST); 
app.get('/kitchen', kitchen.populateOrdersGET); 
app.post('/kitchen/completed', kitchen.updateCompletedPOST); 
app.listen(2000);