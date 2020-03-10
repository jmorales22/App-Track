const express = require('express'),
router = express.Router(),
albumModel = require('../Models/albumModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
const data = await albumModel.getAllAlbums();

res.render('template', { 
  locals: {
    title: 'App Track', 
    data: data
},

  partials: {
    partial: "partial-index"
  }
 });
});

router.get('/:entry_id?', async (req, res, next) => {
  const entryId = req.params.entry_id;
  const data = await albumModel.getById(entryId);
  const reviewList = await albumModel.getReviews(entryId);

  res.render('template', { 
    locals: {
      title: data[0].name, 
      data: data,
      reviewList: reviewList
  },
  
    partials: {
      partial: "partial-review"
    }
  });
});

router.post('/', async function(req, res) {
  const { review_title, review_text, album_id } = req.body;
  const postData = await albumModel.addReview(review_title, review_text, album_id);
  res.sendStatus(200);
})


module.exports = router;