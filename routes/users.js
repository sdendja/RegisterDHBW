var express = require('express');
var router = express.Router();
var multer = require('multer');
var JuicEchain = require("./JuicEchain").JuicEchain;
var User = require('../models/user')
var passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users/login');
});

/*/----Authentification -----------------------------------------




router.get('/login', function(req, res){
  res.render('login.ejs', {message: req.flash('loginMessage')});
});

router.post('/login', passportAuthenticate('local-login', {
  successRedirect: '/book',
  failureRedirect: '/login',
  failureFlash: true
}));

*/ 
//-------Register----------



//-----End Login ------------------------------------------------



module.exports = router;



