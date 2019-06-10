const express = require('express');
const router = express.Router();
var JuicEchain = require("./JuicEchain").JuicEchain;
var rp = require('request-promise');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// GET Userlist page.
router.get('/userlist', ensureAuthenticated, function(req, res) {
  User.find({},{},function(e, docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

// Booking page
router.get('/booking', ensureAuthenticated, function(req, res) {
  res.render('booking');
});

//Enter page
router.get('/entry', function(req, res) {
  res.render('entry');
});

//Create Assets page
router.get('/createAssets', ensureAuthenticated, function(req, res) {
  res.render('createAssets');
});

//Get Balance and post Transfer page
router.get('/requests', ensureAuthenticated, function(req, res) {
  res.render('requests');
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

  var walletaddresstarget = req.query.walletaddresstarget;
  var assetName = req.query.inputAssetName;

  const juicechain = new JuicEchain();

  juicechain.transfer(walletaddresstarget, assetName).then(function(transfer){

      res.send(transfer);
  });
});

router.get('/transfer2', function(req, res){

  var walletaddresstarget = dynamicWallet
  var assetName = req.query.inputAssetName;

  const juicechain = new JuicEchain();

  juicechain.transfer(walletaddresstarget, assetName).then(function(transfer){

      res.send(transfer);
  });
});

router.get('/balance', function(req, res){
   
  const juicechain = new JuicEchain();

  juicechain.balance(dynamicWallet).then(function(balance){
       
      res.send(balance);
      
  });
});

router.get('/balance2', function(req, res){

  const mainwallet = "12T6EhosKPhmpFpc4HAMxx2SwZHLoFmSvW"

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

  var userEmail = req.query.inputUserEmail
  
  
  User.findOne({ email: userEmail },{}, function(err, result){
        
        res.send(result)
  })
});



module.exports = router;
