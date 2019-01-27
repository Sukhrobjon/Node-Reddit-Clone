// Requirements 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// the controllers
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments.js')


// Set db
const database = require('./data/reddit-db');


//mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reddit-clone", {useNewUrlParser: true});


// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


// exporting the routes from controllers
posts(app);
comments(app)

module.exports = app;

// port
app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))

