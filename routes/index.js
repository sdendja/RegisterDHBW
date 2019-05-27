var express = require('express');
var router = express.Router();
const JuicEchain = require("./JuicEchain").JuicEchain;


let storage = require('node-sessionstorage');
let rp = require('request-promise');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('anmeldung', { title: 'Anmeldung' });
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

   /* GET requestlist page. */
   router.get('/requestlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollectionWallet');
    collection.find({},{},function(e,docs){
        res.render('requestlist', {
            "requestlist" : docs
        });
    });
  });



//------------------------------------------------------------------------------------------------------------




router.get('/register', function(req, res){


    const juicechain = new JuicEchain();

    juicechain.wallet().then((register) => {

        // Set our internal DB variable

                
        var db = req.db;
    
        // Get our form values. These rely on the "name" attributes

        var walletaddress = register.payload.address;

        // Set our collection
        var collection = db.get('usercollectionWallet');

        // Submit to the DB register data
        collection.insert({
            "walletaddress" : walletaddress
        }, function (err, doc) {
            if (err) {

                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                res.redirect("requestlist");
            }
        });
        

    })
});

router.get('/asset', function(req, res){


    const juicechain = new JuicEchain();

    juicechain.asset().then(function(asset){

        res.send(asset);
    })
});

router.get('/transfer', function(req, res){

    var test = req.query.walletaddress2;

    const juicechain = new JuicEchain();

    juicechain.transfer(test).then(function(transfer){

        res.send(transfer);
    });
});




router.get('/balance', function(req, res){

    var test1 = req.query.walletaddress1; 

    const juicechain = new JuicEchain();

    juicechain.balance(test1).then(function(balance){
        
        

        
        res.send(balance);
        
        
        
        
    });
});


router.get('/transfer', function(req, res){

    var test2 = req.query.walletaddress2;

    const juicechain = new JuicEchain();

    juicechain.transfer(test2).then(function(transfer){

        res.send(transfer);
        
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
 

  // Submit to the DB register data
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





/* POST to Add Wallet  
router.get('/addwallet', function(req, res) {


    

    // Set our internal DB variable

                
    var db = req.db;
  
    // Get our form values. These rely on the "name" attributes

    var walletaddress = addresstmp

    // Set our collection
    var collection = db.get('usercollectionWallet');

    // Submit to the DB register data
    collection.insert({
        "walletaddress" : walletaddress
    }, function (err, doc) {
        if (err) {

            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("requestlist");
        }
    });
  
  });
*/



  




module.exports = router 





