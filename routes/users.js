var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var JuicEchain = require("./JuicEchain").JuicEchain;
var rp = require('request-promise');
var bcrypt = require('bcryptjs')
var passport = require('passport');
var LocalStrategy = require('passport-local');


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

// Authentification 
router.post('/login', function(req, res){

  var useremail = req.body.email
  var userpassword = req.body.password

  // Set our internal DB variable
  var db = req.db;
 
  // Set our collection
  var collection = db.get('usercollectionMark6');
      
  // Submit to the DB register data

  collection.findOne({"useremail": useremail}, function(err, result){

      if(result == null){
        console.log("Unknown User")
		    
      }
      else{
        var userpasswordhash = result.userpassword
        console.log(result.userpassword)
        bcrypt.compare(userpassword, userpasswordhash, function(err, isMatch){

          if(isMatch){
            req.flash('sucess')
            res.redirect('/');

          }
          else{
            if(err){
              console.log("An error has occurred")
              res.redirect('/users/login');
              return false;
              
            }
            else{
              console.log("Invalid password")
              res.redirect('/users/login');
		          return false;
            }
          }
        });
      }
  });
});






router.post('/login', function(){
passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: 'Invalid useremail or password'}),
function(req, res) {

  req.flash(sucess, 'Youre now logged in');
  res.redirect('/');

  res.redirect('/users/' + req.user.useremail);
};
})

// Serialize and de-serialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Strategy
passport.use(new LocalStrategy(function(useremail, userpassword, done){

  getUserByUseremail(useremail, function(err, user){



    if(err)throw err;
    if(!useremail){
      return done(null, false, {message: 'Unknown User'}) 
    }
    user.comparePassword(userpassword, user.userpassword, function(err, isMatch){



      if(err) return done(err);
      if(isMatch){
        return done(null, user)
      }
      else{
        return done(null, false, {message: 'Invalid Password'})
      }
    })
  });

}));



router.post('/adduser', function(req, res) {
    
  const juicechain = new JuicEchain();

  juicechain.wallet().then((register) => {
    
    // Set our internal DB variable

    var walletaddress = register.payload.address;
    var userPrivateKey = register.payload.privateKey
    var userPublicKey = register.payload.publicKey
    var created = register.payload.created  

    // Set our internal DB variable

    var db = req.db;

    // Get our form values. These rely on the "name" attributes

    var userEmail = req.body.email;
    var userPassword = req.body.password


    bcrypt.hash(userPassword, 10, function(err, hash) {


      // Set our collection
    var collection = db.get('usercollectionMark6');   

    // Submit to the DB register data
    collection.insert({      
            
        "useremail" : userEmail,
        "userpassword" : hash,
        "userwallet" : walletaddress,
        "userPrK" : userPrivateKey,
        "userPuK" : userPublicKey,
        "created" : created
            
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {

            // And forward to success page
            const userlistURL = "/booking?address=" + walletaddress;
            res.redirect(userlistURL);
        }
      });
    });
  });
})

module.exports = router;
