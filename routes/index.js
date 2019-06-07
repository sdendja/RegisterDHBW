var express = require('express');
var router = express.Router();
var JuicEchain = require("./JuicEchain").JuicEchain;
var rp = require('request-promise');
var passport = require('passport');


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollectionMark6');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

//---------Requests---------------------------------------------------------------------------------------------------

router.get('/asset', function(req, res){

    let assetName = req.query.assetName;

    const juicechain = new JuicEchain();

    juicechain.asset(assetName).then(function(asset){

        res.send(asset);
    })
});

router.get('/transfer', function(req, res){

    var walletaddress = req.query.walletaddress;
    var assetName = req.query.inputAssetName;

    const juicechain = new JuicEchain();

    juicechain.transfer(walletaddress, assetName).then(function(transfer){

        res.send(transfer);
    });
});

router.get('/balance', function(req, res){

    var walletaddress = req.query.walletaddress; 

    const juicechain = new JuicEchain();

    juicechain.balance(walletaddress).then(function(balance){
         
        res.send(balance);
        
    });
});

router.get('/balance2', function(req, res){

    var test1 = "12T6EhosKPhmpFpc4HAMxx2SwZHLoFmSvW"

    const juicechain = new JuicEchain();
    
    juicechain.balance(test1).then(function(balance){
                    
        res.send(balance);
                
    });
});

router.get('/db_information', function(req, res){

    var userEmail = req.query.inputUserEmail

    // Set our internal DB variable
    var db = req.db;
   
    // Set our collection
    var collection = db.get('usercollectionMark6');
        
    // Submit to the DB register data

    collection.find({"useremail": userEmail}, function(err, result){

        if(err){
            res.send("There was a problem adding the information to the database.")
        }
        else{
            
            const userwallet = result[0].userwallet
    
            console.log(userwallet);
            
            res.send(userwallet);
        }
       
    })
    
});

router.get('/', ensureAuthenticated, function(req, res, next){
    res.render('index')
  })
  
  function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next
    }
    res.redirect('useres/login')
  }

//------------------------------------------------------

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


  router.post('/login', function(req, res){

    var useremail = req.body.email
    var userpassword = req.body.password

    // Set our internal DB variable
    var db = req.db;
   
    // Set our collection
    var collection = db.get('usercollectionMark6');
        
    // Submit to the DB register data

    collection.findOne({"useremail": useremail}, function(err, result){

        if(err){
            res.send("There was a problem adding the information to the database.")
        }
        else{

            
        
    
            console.log(result);
            
            
        }
       
    })
    
});


module.exports = router