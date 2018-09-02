const express = require('express')
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));

const reviews = require('./controller/reviews.js')(app);

/*
let reviews = [
  { title: "Great Review" },
  { title: "Next Review" }
]
*/

/*
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});
*/

//import reviews from 'reviews';

/*
app.get('/', (req, res) => {
  res.render('home',{ msg: 'Hello World!'});
})
*/

/*
app.get('/', (req, res) => {
  Review.find()
    .then((reviews) => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    })
})
*/
