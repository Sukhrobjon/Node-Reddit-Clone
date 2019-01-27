const Post = require('../models/post.js');
const User = require('../models/user')
module.exports = (app) => {
    // INDEX
    app.get('/', function (req, res) {
        Post.find()
            .then(posts => {
                res.render('posts-index', { posts });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // NEW
    app.get("/posts/new", function (req, res) {
        res.render('posts-new', {})
    });

    // CREATE
    app.post('/posts/new', function (req, res) {
        // INSTANTIATE INSTANCE OF POST MODEL
        const post = new Post(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        post.save((err, post) => {
            // REDIRECT TO THE ROOT
            return res.redirect(`/`);
        })
    });

    // SHOW
    app.get("/posts/:id", function (req, res) {
        // LOOK UP THE POST
        Post.findById(req.params.id).populate('comments').then((post) => {
            res.render('posts-show', {
                post
            })
        }).catch((err) => {
            console.log(err.message)
        })
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        Post.find({
                subreddit: req.params.subreddit
            })
            .then(posts => {
                res.render("posts-index", {
                    posts
                });
            })
            .catch(err => {
                console.log(err);
            });
    });

}

