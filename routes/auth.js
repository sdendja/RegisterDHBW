var User = require('../models/user')

module.exports = function(app, passport){
    
    app.get('/', function(req, res){
        res.render('/index.ejs');
    });

    app.get('/sign-up', function(req, res){
        res.render('register.ejs', {message: req.flash('signupMessage')});
    });


    app.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }))
      
    app.get('/:username/:password', function(req, res){
        var newUser = new User();
        newUser.local.username = req.params.email;
        newUser.local.password = req.params.password;
        newUser.save(function(err){
            if(err)
            throw err;
        });
        res.redirect('Success');
    })
    
}
 