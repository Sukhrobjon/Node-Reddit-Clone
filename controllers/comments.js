const Post = require('../models/post.js')
const Comment = require('../models/comment.js')
const User = require('../models/user')


// TO-DO: Check with Dani if comment is assosiated with author


module.exports = function(app) {
    // CREATE Comment
    app.post('/posts/:postId/comments', function (req, res) {
        var currentUser = req.user;
        if (req.user) {
            const comment = new Comment(req.body)
            comment.author = req.user._id;
            //save instance of comment model to DB
            comment
                .save()
                .then((comment) => {
                    console.log(req.body)
                    return Post.findById(req.params.postId)

                }).then(post => {
                    
                    console.log(post)

                    post.comments.unshift(comment);
                    console.log('here')
                    return post.save();
                    // return Post.findById(req.params.postId);
                }).then(comment => {
                    // post.comments.unshift(comment)
                    // return post.save()
                    return User.findById(req.user._id);
                })
                .then(user => {
                    console.log(user)
                    user.comments.unshift(comment);
                    user.save();
                    res.redirect('/');
                    // res.redirect('/posts/' + req.params.postId); >> giving error of Comment validation failed: postId: Path `postId` is required.
                })
                .then(post => {
                    res.redirect('/');
                })
                .catch(err => {
                    console.log("oops")
                    console.log(err.message);
                })
        } else {
            return res.status(401).send({
                message: "login first"
            });
        }
    })


};