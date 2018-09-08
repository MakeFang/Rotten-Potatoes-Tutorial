const express = require('express')
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//added to allow static
app.use(express.static('public'));
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useMongoClient: true });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'));

const reviews = require('./controller/reviews.js');
const comments = require('./controller/comments.js');
const movies = require('./controller/movies.js');
const admin = require('./controller/admin.js');
reviews(app);
comments(app);
movies(app);
admin(app);
