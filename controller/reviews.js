//reviews.js

const Review = require('../model/review.js');
const Comment = require('../model/comment.js');

function reviews(app) {

  app.get('/', (req, res) => {
    Review.find()
      .then(reviews => {
        res.render('reviews-index', {reviews: reviews});
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
      console.log(review)
      res.redirect(`/reviews/${review._id}`)
    }).catch((err) => {
      console.log(err.message)
    })
  })

  //how to resolve new/:id conflict?

  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  })

  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      Comment.find({ reviewId: req.params.id }).then(comments => {
        // respond with the template with both values
        res.render('reviews-show', { review: review, comments: comments })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });

  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id).then((review) =>{
      res.render('reviews-edit', {review: review})
    }).catch((err)=>{
      console.log(err.message);
    })
  })

  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!')
  })

}

module.exports = reviews;
