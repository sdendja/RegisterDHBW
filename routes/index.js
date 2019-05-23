var express = require('express');
var router = express.Router();
const CryptoUtils = require("./CryptoUtil").CryptoUtils;
const JuicEchain = require("./JuicEchain").JuicEchain;


let storage = require('node-sessionstorage');
let rp = require('request-promise');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('anmeldung', { title: 'Anmeldung' });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* Requests page */
router.get('/requests', function(req, res) {
    res.render('requests', { title: 'Requests try it out' });
  });
  
  /* GET Userlist page. */
  router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollectionMark1');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
  });


//------------------------------------------------------------------------------------------------------------




router.get('/register', function(req, res){


    const juicechain = new JuicEchain();

    juicechain.wallet();
});


router.get('/asset', function(req, res){


    const juicechain = new JuicEchain();

    juicechain.asset();
});

router.get('/transfer', function(req, res){


    const juicechain = new JuicEchain();

    juicechain.transfer("1PWA6McT2UCKWEc3VqUQKq2rT1q5kHWpk7");
});




router.get('/balance', function(req, res){


    const juicechain = new JuicEchain();

    juicechain.balance("1PWA6McT2UCKWEc3VqUQKq2rT1q5kHWpk7").then(function(balance){

        res.send(balance);
    });
});



const requestToken = function(){
    return new Promise(function(resolve, reject) {

        let options = {
            method: 'POST',
            url: 'https://demo.juicechain.org/node/auth',
            headers: {
                'authorization': 'none'
            },
            body: {
                username: "none",
                password: "none"
            },
            json: true
        };

        rp(options).then(result => {
            resolve(result);
        });

    });
}
//--------------------------------------------------------------------------------
/* POST to Add User Service */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes


  var userName = req.body.username;
  var userLastname = req.body.lastname
  var userEmail = req.body.useremail;
  var userStadt = req.body.stadt;
  var userPlz = req.body.plz;
  var userBirth = req.body.birth;

  // Set our collection
  var collection = db.get('usercollectionMark1');

  // Submit to the DB
  collection.insert({
      
      "username" : userName,
      "lastname" : userLastname,
      "useremail" : userEmail,
      "stadt" : userStadt,
      "plz" : userPlz,
      "birth" : userBirth



  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});



module.exports = router 





