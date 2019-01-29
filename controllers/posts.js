const Post = require('../models/post.js');
const User = require('../models/user')

/**
* TO-DO:
* Check if:  
* var currentUser = req.user is placed right places and 
* correctly implemented?
*/

module.exports = (app) => {
    // INDEX
    app.get('/', function (req, res) {
        var currentUser = req.user;
        console.log(req.cookies);
        Post.find().populate('author')
            .then(posts => {
                console.log(`currenUser: ${currentUser}`)
                res.render('posts-index', { posts, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // NEW
    app.get("/posts/new", function (req, res) {
        // var currentUser = req.user;
        res.render('posts-new', {})
    });

    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;

            post
                .save()
                .then(post => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.posts.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect(`/posts/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });


    // SHOW One post
    app.get("/posts/:id", function (req, res) {
        // LOOK UP THE POST
        var currentUser = req.user;
        Post.findById(req.params.id).populate({path:'comments', populate: {path: 'author'}}).populate('author')
            .then((post) => {
                res.render('posts-show', { post, currentUser })
            }).catch((err) => {
                console.log(err.message)
            })
    });

    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).populate('author')
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });

}


/**
* Problem not all subreddits are shown:
* specifically under 'coding' subreddit
* 
* 
*   STRETCH CHALLENGE:
* 
* 1. Can you make an author's username a link that displays 
*    that users' profile at /users/:username?
* 2. Can you do the same for comments ?
* 3. Can you make a /profile route that loads the current user 
*    and displays their posts and comments ?
*/
