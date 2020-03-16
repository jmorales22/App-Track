const express = require('express'),
userModel = require('../Models/userModel'),
router = express.Router();


router.get('/', async function(req, res, next) {
  const data = await userModel.getById();
  res.render('template', { 
    locals: {
      title: 'App Track',
      data: data,
      is_logged_in: req.session.is_logged_in 
  },

    partials: {
      partial: "partial-index"
    }
  });
});

  
router.post('/', async function(req, res, next) {
  const { email, password } = req.body;
  
  const user = new userModel(null, null, null, email, password);
  const loginResponse = await user.loginUser();
  console.log('login response is', loginResponse);
  
  if (!!loginResponse.isValid) {
    req.session.is_logged_in = loginResponse.isValid;
    req.session.user_id = loginResponse.user_id;
    req.session.first_name = loginResponse.first_name;
    req.session.last_name = loginResponse.last_name;
    req.session.save();

    res.redirect('/main');
  } else {
    //res.sendStatus(401);
    res.redirect('/');
  }
  });

  router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
    });

module.exports = router;