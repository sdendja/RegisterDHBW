var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var expressValidator = require('express-validator');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var bcrypt = require('bcryptjs')
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts')

var app = express();

//---Database via Monk----
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')



require('./config/passport')(passport);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//make flash work
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
//Handle Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//-----------------------------------------------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//ejs-layouts
app.use(expressLayouts);

app.get('/', function(req, res) {
  var locals = {
    title: 'Page Title',
    description: 'Page Description',
    header: 'Page Header'
  };
  res.render('index', locals);
});

app.get('/booking', function(req, res) {
  res.render('booking');
});

app.get('/entry', function(req, res) {
  res.render('entry');
});

app.get('/createAssets', function(req, res) {
  res.render('createAssets');
});

app.get('/requests', function(req, res) {
  res.render('requests');
});

app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//-----------------------------------------------------------------------------------------
require('./routes/auth')(app, passport)
module.exports = app;
