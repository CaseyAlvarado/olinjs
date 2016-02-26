var exphbs = require('express-handlebars');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var methodOverride = require('method-override'); 

mongoose.connect('mongodb://localhost/ToDoApp');

var express = require('express');
var ToDo = require('./routes/toDo');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));


app.get('/api/toDos/active', ToDo.getActiveToDosGET); 
app.get('/api/toDos/completed', ToDo.getCompletedToDosGET); 
app.get('/api/toDos/all', ToDo.getAllToDosGET); 
app.post('/api/toDos', ToDo.addNewToDoPOST);
app.post('/api/toDos/completed/:todo_id', ToDo.toDoCompletedPOST); 
app.post('/api/toDos/update/:todo_id', ToDo.editToDoPOST); 
app.post('/api/toDos/:todo_id', ToDo.deleteToDoPOST);
app.get('*', ToDo.catchAnything);

app.listen(2000);
console.log("Listening on port 2000"); 

module.exports = app; 