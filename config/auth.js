module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Bitte anmelden, um diese Ressource zu sehen');
    res.redirect('/users/login');
  },

  ensureAuthenticated2: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Sie können sich nicht abmelden, wenn Sie nicht angemeldet sind');
    res.redirect('/users/login');
  },

  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/welcome2');      
  },
};
