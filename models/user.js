var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodetest1');

var db = mongoose.connection;

var bcrypt = require('bcryptjs')

//User Schema
var UserSchema = mongoose.Schema({
        useremail: {
            type: String,
            index: true
        },
        userpassword: {
            type: String
        },
        userwallet: {
            type: String
        },
        userPrK: {
            type:String
        },
        userPuK: {
            type:String
        },
        created: {
            type:String
        }
});

var User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUseremailById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUseremail = function(useremail, callback){
    var query = {useremail: useremail};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    });
}



module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.userpassword, salt, function(err, hash){
            newUser.userpassword = hash;
            newUser.save(callback);
        });
    });
}