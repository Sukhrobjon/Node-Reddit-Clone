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
        var currentUser = req.user;
        res.render('posts-new', {currentUser})
    });

    // CREATE
    app.post("/posts/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;
            post.upVotes = [];
            post.downVotes = [];
            post.voteScore = 0;
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
        var currentUser = req.user;
        Post.findById(req.params.id).populate('comments').lean()
            .then(post => {
                    //  console.log(post)
                     console.log("comments on comments: "+ post.comments.comments)
                     res.render("posts-show", {
                         post,
                         currentUser
                     });
                })
            .catch(err => {
                console.log(err.message);
            });
    });


    // SUBREDDIT
    app.get("/n/:subreddit", function (req, res) {
        var currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).lean()
            .then(posts => {
                res.render("posts-index", { posts, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.put("/posts/:id/vote-up", function (req, res) {
        Post.findById(req.params.id).exec(function (err, post) {
            console.log('vote up')
            post.upVotes.push(req.user._id);
            post.voteScore = post.voteScore + 1; 
            post.save();

            res.status(200);
        });
    });

    app.put("/posts/:id/vote-down", function (req, res) {
        Post.findById(req.params.id).exec(function (err, post) {
            console.log('vote down')
            post.downVotes.push(req.user._id);
            post.voteScore = post.voteScore - 1;
            post.save();

            res.status(200);
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

/**
 * TO-DO 
 * 1. There is a bug when clicked subreddit 'coding' it shows empty page
 * 2. And When I tried to add a comment, it didnt work either
 */