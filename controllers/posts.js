const Post = require('../models/post.js');

module.exports = app => {
    // Index
    app.get('/', (req, res) => {
        res.render('home', {})
    })
    // // INDEX
    // app.get('/', (req, res) => {
    //     Post.find()
    //         .then(post => {
    //             res.render('home', { post: post });
    //         })
    //         .catch(err => {
    //             console.log(err.message);
    //         });
    // });

    
    // NEW
    app.get("/posts/new", (req, res) => {
        res.render('posts-new', {})
    });

    app.post("/posts/new", (req, res) => {
        console.log(req.body)
    })
}

