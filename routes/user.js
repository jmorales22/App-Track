const express = require('express'),
bcrypt = require('bcryptjs'),
UserModel = require('../models/userModel'),
router = express.Router();

/* GET users listing. */
router.get('/signup', function(req, res, next) {
res.render('template', {
  locals: {
    title: 'User Sign Up',
    is_logged_in: req.session.is_logged_in
  },
  partials: {
    partial: 'partial-signup'
  }
});
});

router.post('/signup', function(req, res, next) {
const { first_name, last_name, password, email } = req.body;

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

const user = new UserModel(null, first_name, last_name, email, hash);
user.addUser();

res.redirect('/');
});

router.get('/logout', function(req, res) {
req.session.destroy();
res.redirect('/');
});

module.exports = router;