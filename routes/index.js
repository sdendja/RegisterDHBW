var express = require('express');
var router = express.Router();
const JuicEchain = require("./JuicEchain").JuicEchain;
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
    var collection = db.get('usercollectionMark3');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
  });


  /* Requests page */
router.get('/booking', function(req, res) {
    res.render('booking', { title: 'Book your ticket! try it out' });
  });

  /* Requests page */
router.get('/createAssets', function(req, res) {
    res.render('createAssets', { title: 'Create your Assets! try it out' });
  });



//------------------------------------------------------------------------------------------------------------


router.post('/adduser', function(req, res) {

    //-------------------------------
    
        const juicechain = new JuicEchain();
    
        juicechain.wallet().then((register) => {
    
            // Set our internal DB variable
    
            var walletaddress = register.payload.address;  
    
            // Set our internal DB variable
    
            var db = req.db;
    
            // Get our form values. These rely on the "name" attributes
    
            var userEmail = req.body.useremail;
            var userWallet = walletaddress;
                
            // Set our collection
            var collection = db.get('usercollectionMark3');
                
    
            // Submit to the DB register data
            collection.insert({      
                    
                "useremail" : userEmail,
                "userwallet" : userWallet,
                    
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
    })


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
    var collection = db.get('usercollectionMark3');
        

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

module.exports = router