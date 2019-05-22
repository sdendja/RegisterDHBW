var express = require('express');
var router = express.Router();

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







/*Wallet Balance*/ /*
 let rp = require('request-promise');

 const options = {
  method: 'GET',
  url: 'https://demo.juicechain.org/node/wallet/1CRrz65gWA7fa2dzLzmYy9tpUKSTMMBjAz/1/1234',
  headers: {
      'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjViZTNmNjUzMzhkYjhlMDU4ZjQ3YThjMiIsInRpbWVzdGFtcCI6IjIwMTktMDUtMjBUMTQ6MjA6MzEuNDk4WiIsIm5vZGUiOiJkZW1vIn0.7svtEyoGEmqslvawaoF3PcXBMUexT5bMCu0Gcn8ubcI'
  },
  body: {
      adress: "1CRrz65gWA7fa2dzLzmYy9tpUKSTMMBjAz",
      minconf: "1",
      time: "1234"
  },
  json: true
};

rp(options).then(result => {
  console.log(result);
});
*/



/*token+wallet*/
/*
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
  console.log(result);
  alert("Sie haben sich erfolgreich registriert!");
  storage.setItem("token", result["token"])
  //token = result["token"];
  }).then(function() {
    console.log(storage.getItem("token"));
    
    let options2 = {
      method: 'POST',
      url: 'https://demo.juicechain.org/node/wallet',
      headers: {
          'authorization': storage.getItem("token")
      },
      json: true
    };
    rp(options2).then(result => {
      console.log(result["payload"]["address"]);
    })
  });
*/


/*
let rp = require('request-promise');

const options = {
 method: 'POST',
 url: 'https://demo.juicechain.org/node/assets',
 headers: {
     'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjViZTNmNjUzMzhkYjhlMDU4ZjQ3YThjMiIsInRpbWVzdGFtcCI6IjIwMTktMDUtMjBUMTQ6MjA6MzEuNDk4WiIsIm5vZGUiOiJkZW1vIn0.7svtEyoGEmqslvawaoF3PcXBMUexT5bMCu0Gcn8ubcI',
     'signature': ''
 },
 body: {
  "name": "someAssetName",
  "amount": 1000,
  "title": {
    "de_DE": "some title"
  },
  "publisher": "5cb585e1c7baca264c981f38",
  "type": "voucher",
  "target": "1C2curDqbYmydLTgxzGr6d8ahckAGdePyv",
  "style": "",
  "description": "Some longer text",
  "options": {
    "transfer": true,
    "transferNode": "",
    "returnAddress": "1CRrz65gWA7fa2dzLzmYy9tpUKSTMMBjAz",
    "offineTargets": ""
  
  }
 },
 json: true
};

rp(options).then(result => {
 console.log(result);
});
*/


//authentification
router.post('/authenticate', function(req){
  

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
      console.log(result);
      res.redirect("userlist");
  
      });
   

})



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





