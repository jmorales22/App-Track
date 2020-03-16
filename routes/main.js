const express = require('express'),
  router = express.Router(),
  mainModel = require('../Models/mainModel'),
  reviewsModel = require('../Models/reviewsModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  if (req.session.is_logged_in == true) {
    const data = await mainModel.getAllCompanies();

    res.render('template', { 
      locals: {
        title: 'App Track', 
        data: data,
        is_logged_in: req.session.is_logged_in
    },

      partials: {
        partial: "partial-main"
      }
    });
  } else {
  res.redirect('/users/signup');
  };
});

/* GET company page */
router.get('/:entry_id?', async (req, res, next) => {
  if (req.session.is_logged_in == true) {
    const entryId = req.params.entry_id;
    const review_data = await reviewsModel.getCompanyReviews(entryId);

    res.render('template', {
      locals: {
        title: 'app.track',
        data: review_data,
        is_logged_in: req.session.is_logged_in
    },
    
      partials: {
        partial: "partial-company"
      }
    });
   } else {
      res.redirect('/users/signup');
  }
});

module.exports = router;