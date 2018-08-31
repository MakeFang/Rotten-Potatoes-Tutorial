const express = require('express')
var exphbs = require('express-handlebars');

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home',{ msg: 'Hello World!'});
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
