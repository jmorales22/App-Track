const express = require('express'),
    reviewModel = require('../Models/reviewModel'),
    router = express.Router();

router.get('/', function(req, res, next) {

    res.render('template', { 
    locals: {
        title: 'App Track', 
    },

    partials: {
        partial: "partial-review"
    }
    });
});

router.post('/', async function(req, res) {
  const { interview_rating, whiteboarding_rating, job_offer, comments } = req.body;
  const review = new reviewModel(null, null, null, interview_rating, whiteboarding_rating, job_offer, comments);
  const addReview = await review.addReview();
  res.sendStatus(200);
})


module.exports = router;