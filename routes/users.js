const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var JuicEchain = require("./JuicEchain").JuicEchain;
var rp = require('request-promise');
// Load User model
const User = require('../models/User');
const { ensureAuthenticated, ensureAuthenticated2, forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { email, password, password2 } = req.body;
  let errors = [];

  if (!email || !password || !password2) {
    errors.push({ msg: 'Bitte alle Felder ausfüllen' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwörter stimmen nicht überein' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password muss mindestens 6 Stellen aufweisen' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      password2
    });
  } else {

    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email bereits belegt' });
        res.render('register', {
          errors,
          email,
          password,
          password2
        });
      } else {

        const juicechain = new JuicEchain();
        juicechain.wallet().then((register) => {

        let walletcreated = register.payload.address
        let privateKey = register.payload.privateKey
        let publicKey = register.payload.publicKey
        let created = register.payload.created
       
        const newUser = new User({
  
          email,
          password,
          walletcreated,
          privateKey,
          publicKey,
          created

        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
                req.flash(
                  'success_msg',
                  'Sie sind jetzt registriert und können sich anmelden. ',
                  'Ihre Walletadresse ist: ' + walletcreated
                );
                res.redirect('/users/login');  
              })
              .catch(err => console.log(err));
          });
        });
      })}
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/welcome2',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', ensureAuthenticated2, (req, res) => {
  req.logout();
  req.flash('success_msg', 'Sie sind abgemeldet');
  res.redirect('/users/login');
});

module.exports = router;
