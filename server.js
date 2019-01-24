// Requirements 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


// handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
app.get('/', (req, res) => res.render('home'))

// port
app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))