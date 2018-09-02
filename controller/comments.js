const Comment = require('../model/comment.js');

function comments(app) {

  app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
      console.log(comment);
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message)
    })
  })

}

module.exports = comments;
