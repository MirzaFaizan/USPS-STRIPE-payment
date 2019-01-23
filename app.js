var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var debug = require('debug')('app4')
var multer = require('multer');
var upload = multer();

// Database
//var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/radioShieldBetaV1');

//mongoose.connect('mongodb://localhost:27017/radioShieldBetaV1', {useNewUrlParser: true});
//let db = mongoose.connection;

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/radioShieldBetaV1", {useNewUrlParser: true}, function(err, db) {
  if(err) {
    console.log(err);
  }console.log("We are connected to local DB");
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

/*
view engine setup
Using Handlebars for the view engine, all .html docs will be .hbs instead
in the views folder there will be partials and layouts for reuse.
*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','.hbs');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());



//app.use(bodyParser.text({ type: 'text/html' }))
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());//Very Important to parse body
//app.use(express.static('public'));

// Make our db accessible to our router
//Since this is sequential programming, this must be above router lines below
//app.use(function(req,res,next){
//    req.db = db;
//    next();
//});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.locals.message);
  console.log(res.locals.error);

  // render the error page
  res.status(err.status || 500);
  console.log(err.status);
  res.render('error');
});

//module.exports = app;

app.set('port', process.env.PORT || 3000)

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port)
})
