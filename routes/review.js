const express = require('express'),
    reviewModel = require('../Models/reviewModel'),
    companyModel = require('../Models/companyModel'),
    db = require('../Models/conn'),
    userModel = require('../Models/userModel'),
    router = express.Router();

router.get('/', function(req, res, next) {

    res.render('template', { 
    locals: {
        title: 'app.track',
        is_logged_in: req.session.is_logged_in  
    },

    partials: {
        partial: 'partial-review'
    }
    });
});

router.post('/', async function(req, res, next) {
    if (is_logged_in = req.session.is_logged_in) {
        const { name, location, interview_rating, whiteboarding_rating, job_offer, comments } = req.body;
        console.log(req.body);
        const userId = req.session.user_id;
        const responce = await db.any ('SELECT id FROM test_companies WHERE name = $1', [name]);
        const companyId = responce && responce[0] && responce[0].id;

        if (companyId) {
            const review = new reviewModel(null, userId, companyId, interview_rating, whiteboarding_rating, job_offer, comments);
            const addReview = await review.addReview();
            if (addReview){
                res.status(200).redirect('/main');
            }
            else {
                res.sendStatus(500);
            }
        } else {
            const company = new companyModel(null, name, location);
            const addCompany = await company.addCompany();
            const responce = await db.any ('SELECT id FROM test_companies WHERE name = $1', [name]);
            const newCompanyId = responce && responce[0] && responce[0].id;

            const review = new reviewModel(null, userId, newCompanyId, interview_rating, whiteboarding_rating, job_offer, comments);
            const addReview = await review.addReview();
            } 
        } else {
            res.redirect('/users/signup');
    }

    next(); 
  });

module.exports = router;