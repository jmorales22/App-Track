const express = require('express'),
router = express.Router(),
mainModel = require('../Models/mainModel');
companyModel = require('../Models/companyModel');
reviewsModel = require('../Models/reviewsModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
const data = await mainModel.getAllCompanies();

res.render('template', { 
  locals: {
    title: 'App Track', 
    data: data
},

  partials: {
    partial: "partial-main"
  }
 });
});

/* GET company page */
router.get('/:entry_id?', async (req, res, next) => {
  const entryId = req.params.entry_id;
  const review_data = await reviewsModel.getCompanyReviews(entryId);

  res.render('template', {
    locals: {
      title: 'app.track',
      data: review_data
  },
  
    partials: {
      partial: "partial-company"
    }
  });
});

module.exports = router;