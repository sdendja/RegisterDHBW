const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
///const MongoInMemory = require('mongo-in-memory');
const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config const db = mongoose.connection; 
const db = require('./config/keys').mongoURI;

    // Connect to MongoDB#
    mongoose.connect("mongodb://dhbw:dhbw2019@zion.juicecommerce.de:27017/dhbw", {
        useNewUrlParser: true }).then(() =>
        console.log('MongoDB Connected')).catch(err =>
        console.log(err));


// EJS  
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
