const express = require('express'),
    reviewModel = require('../Models/reviewModel'),
    companyModel = require('../Models/companyModel'),
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

router.post('/', async function(req, res, next) {
    const { name, location } = req.body;
    console.log(req.body);
    // here, you should check to see if the company exisit first, if not, create new company or if true, use the id to complete the review.
    const company = new companyModel(null, name, location);
    const addCompany = await company.addCompany();
    next();
  })

router.post('/', async function(req, res) {
    const { interview_rating, whiteboarding_rating, job_offer, comments } = req.body;

    // query the db and say `select id from companyModel where name = ${name}`

    const review = new reviewModel(null, null, null, interview_rating, whiteboarding_rating, job_offer, comments);
    const addReview = await review.addReview();
    if (addReview){
        res.status(200).redirect("/");
    }
    else {
        res.sendStatus(500);
    }
  })

module.exports = router;