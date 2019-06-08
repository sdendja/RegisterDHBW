var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')
var flash = require('connect-flash');
var app = express();




module.exports= function(passport){

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  
  passport.use('local-singup', new LocalStrategy({
    usernamefield: 'email',
    passwordfield: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({'local.username': email}, function(err, user){
        if(err)
        return done(err);
        if(user){
          return done(null, false, req.flash('message', 'That email already taken'));
        } else{
          var newUser = new User();
          newUser.local.username = email;
          newUser.local.password = password;
  
          newUser.save(function(err){
            if(err)
              throw err;
            return done(null, newUser);
          })
        }
      })
    })
  }
  ))
  
}