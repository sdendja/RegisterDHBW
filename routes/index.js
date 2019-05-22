var express = require('express');
var router = express.Router();
const CryptoUtils = require("./CryptoUtil").CryptoUtils;


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

router.get('/register', function(req, res){

    requestToken().then(function(token){

        let options = {
            method: 'POST',
            url: 'https://demo.juicechain.org/node/wallet',
            headers: {
                'authorization': token.token
            },
            json: true
        };

        rp(options).then(result => {
            console.log(result);
        });

    });

});

router.get('/asset', function(req, res){

    requestToken().then(function(token){

        let options = {
            method: 'POST',
            url: 'https://demo.juicechain.org/node/assets/',
            headers: {
                'authorization': token.token,
                'signature': "",
            },
            body: {
                "name": "someAssetName2",
                "amount": 1000,
                "title": {
                    "de_DE": "some title",
                    "en_GB": "some title"
                },
                "publisher": "DHBW",
                "type": "voucher",
                "target": "12T6EhosKPhmpFpc4HAMxx2SwZHLoFmSvW",
                "description": "Some longer text",
                "options": {
                    "transfer": true,
                    "transferNode": null,
                    "returnAddress": null,
                    "offlineTargets": null
                }
            },
            json: true
        };

        rp(options).then(result => {
            console.log(result);
        });

    });

});


router.get('/transfer', function(req, res){

    requestToken().then(function(token){

        const signature = CryptoUtils.generateAuthToken("L57eRseU9tRquYNWkWHZX4S1J8cnV6sGZ2h4tvnSt4jrES59zoqX",
            "12T6EhosKPhmpFpc4HAMxx2SwZHLoFmSvW", "", "");

        let options = {
            method: 'POST',
            url: 'https://demo.juicechain.org/node/wallet/transfer/1PWA6McT2UCKWEc3VqUQKq2rT1q5kHWpk7',
            headers: {
                'authorization': token.token,
                'signature': signature
            },
            body: {
                asset: "demo:someassetname2",
                amount: 2,
                payload: ""
            },
            json: true
        };

        rp(options).then(result => {
            console.log(result);
        });

    });

});


router.get('/balance', function(req, res){

    requestToken().then(function(token){

        const time = new Date();

        let options = {
            method: 'GET',
            url: 'https://demo.juicechain.org/node/wallet/1PWA6McT2UCKWEc3VqUQKq2rT1q5kHWpk7/0/' + time.getTime(),
            headers: {
                'authorization': token.token,
            },
            json: true
        };

        rp(options).then(result => {
            return res.send(result);
        });

    });

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





