// Requirements 
const dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()

const port = process.env.PORT || 3000
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// the controllers
const posts = require('./controllers/posts.js');
const comments = require('./controllers/comments.js')
const auth = require('./controllers/auth.js')
const replies = require('./controllers/replies')


// Set db
const database = require('./data/reddit-db.js');


//mongodb
// const mongoose = require("mongoose");
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/redditjs-clone", {useNewUrlParser: true});


// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());

app.use(express.static('public'));

// Checking authentication if user is logged in
var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, {
            complete: true
        }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);

// exporting the routes from controllers
posts(app);
comments(app)
auth(app)
replies(app)
module.exports = app;


// port
app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))

