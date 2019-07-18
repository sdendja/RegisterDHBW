const express = require('express');
const router = express.Router();
var JuicEchain = require("./JuicEchain").JuicEchain;
var rp = require('request-promise');
const { ensureAuthenticated, ensureAuthenticated3, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
const Asset = require('../models/Asset')

// Welcome Page before login
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Welcome Page after login
router.get('/welcome2', ensureAuthenticated, (req, res) => res.render('welcome2'));

// GET Userlist page.
router.get('/userlist', ensureAuthenticated, function(req, res) {
  User.find({},{},function(e, docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});


//Booking page
router.get('/booking', ensureAuthenticated, function(req, res) {
  res.render('booking');
});

//Enter page
router.get('/entry', function(req, res) {
  res.render('entry');
});

//Create Assets page
router.get('/createAssets', ensureAuthenticated, (req, res) => {
  const mainwallet = "1JcYgwK8EYQiwSLvRZjY8kr2h7dCUTpPr5"
  const mainwallet2= "1HDKZraWkYXAGHLhhjgDJKgHLbUc25wiAZ"
  const status = ""

  if(dynamicWallet != mainwallet){
  
    if(dynamicWallet != mainwallet2){
      req.flash('error_msg', 'Keine Berechtigung für diese Ressoucrce. Bitte als Admin anmelden');
      res.redirect('/welcome2');
    }else{
      res.render('createAssets');
    }
  }else{
    res.render('createAssets');
  }
    
});


//Get Balance and post Transfer page
router.get('/requests', ensureAuthenticated, function(req, res) {
  res.render('requests');
});
//---------Requests---------------------------------------------------------------------------------------------------
router.get('/asset', function(req, res){

  const assetName = req.query.assetName;
  const amount = req.query.amount
  const juicechain = new JuicEchain();
  let assetname = assetName
  let walletamount = amount
  

  juicechain.asset(assetName, amount).then(function(asset){
    

    const newAsset = new Asset({

      assetname,
      walletamount

    });

    newAsset.save().then(asset => {
    
  });
      
      res.send(asset);
  })
  
});


//User to User
router.get('/transfer', function(req, res){

  const address = req.query.walletaddresstarget;
  const assetName = req.query.inputAssetName;
  const sourceaddress = dynamicWallet
  const sourceKey = dynamicPrivateKey
  const amount = req.query.inputAssetAmount
  const juicechain = new JuicEchain();

  juicechain.transfer(sourceKey, sourceaddress, address, assetName, amount).then(function(transfer){
      
      res.send(transfer);
  });
});

//Mainwallet to User
router.get('/transfer2', function(req, res){
  
  const address = dynamicWallet
  const assetName = req.query.inputAssetName;
  const amount = req.query.amount
  const sourceaddress = "1JcYgwK8EYQiwSLvRZjY8kr2h7dCUTpPr5"
  const sourceKey = "L3PN3QBcmKBnWP58D6f8KN38JgGVbjisYntq8optx93tmonfJYD2"
  const juicechain = new JuicEchain();

  juicechain.transfer(sourceKey, sourceaddress, address, assetName, amount).then(function(transfer){
    
      res.send(transfer);
  });
});

//Mainwallet to admin2
router.get('/transfer3', function(req, res){
  
  const address = req.query.walletaddresstarget
  const assetName = req.query.inputAssetName;
  const amount = req.query.amount
  const sourceaddress = "1JcYgwK8EYQiwSLvRZjY8kr2h7dCUTpPr5"
  const sourceKey = "L3PN3QBcmKBnWP58D6f8KN38JgGVbjisYntq8optx93tmonfJYD2"
  const juicechain = new JuicEchain();

  juicechain.transfer(sourceKey, sourceaddress, address, assetName, amount).then(function(transfer){
  
    res.send(transfer);
  });
});

router.get('/balance', function(req, res){
   
  const juicechain = new JuicEchain();
  console.log("lala_1")

  juicechain.balance(dynamicWallet).then(function(balance){
    console.log("lala_2")
      res.send(balance);
      
  });
});

router.get('/balance2', function(req, res){

  const mainwallet = "1JcYgwK8EYQiwSLvRZjY8kr2h7dCUTpPr5"

  const juicechain = new JuicEchain();
  
  juicechain.balance(mainwallet).then(function(balance){

      res.send(balance);
              
  });
});

router.get('/balance3', function(req, res){

  var walletaddress = req.query.walletaddress;

  const juicechain = new JuicEchain();
  
  juicechain.balance(walletaddress).then(function(balance){
                  
      res.send(balance);
              
  });
});

router.get('/db_information', function(req, res){
  

  const userEmail = req.query.inputUserEmail
  User.findOne({ email: userEmail },{}, function(err, result){
        
        res.send(result)
        
  })
});


module.exports = router;
