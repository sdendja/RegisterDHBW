const mongoose = require('mongoose');
const AssetSchema = new mongoose.Schema({
  
    assetname: {
      type: String,
      required: true
    },
    walletamount: {
      type: String,
      required: true
    },
  });
  
  const Asset = mongoose.model('Assets', AssetSchema);

  module.exports = Asset;