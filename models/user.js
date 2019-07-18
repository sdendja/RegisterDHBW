const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  walletcreated: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  publicKey: {
    type: String,
    required: true
  },
  dateRegister: {
    type: Date,
    default: Date.now
  },
  created: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;