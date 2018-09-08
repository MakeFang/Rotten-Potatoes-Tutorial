const mongoose = require('mongoose')

const Review = mongoose.model('Review', {
  movieId: { type: String, required: true },
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review;
