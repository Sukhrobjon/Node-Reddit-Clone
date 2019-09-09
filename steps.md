## Learning outcomes
* [X] Implement a large scale application using Express, Handlebars, and MongoDB/Mongoose
* [X] Implement an authentication flow through JWTs that allows users to sign up, log in, and log out, and restricts functionality based on authentication status
* [X] Investigate how to use the populate method in Mongoose for advanced associations
* [X] Implement more intricate tests for CRUD apps as well as for authentication flows.

1. `npm init, npm install express --save`
2. `npm install express-handlebars --save`
    var exphbs = require('express-handlebars');

- why use `unshift` instead of `push` 
`unshift` adds an element to the front of an array, while `push` adds it to the end. Reddit puts its newest comments at the top, so we want the default order to be reverse chronological order.

4. Just the id's right? When we do a reference association, we only save the id's into the parent's document. In order to replace these id's with the actual child document, we have to use the mongoose function `.populate()` when we fetch the parent from the database.

- Question:
    what is the difference 
    ```javascript
    app.get('/', function (req, res) {
    var currentUser = req.user;
    Post.find()
        .then(posts => {
            res.render('posts-index', { posts, currentUser });
        })
        .catch(err => {
            console.log(err.message);
        });
    });

    res.render('posts-index', { posts, currentUser });
    
    vs

    res.render('posts-index', { post: post, currentUser: currentUser });
    ```
## Stretch Challenge
* [ ] Add Delete and Edit functionality so user can delete their posts
* [ ] Associate Posts and Comments with user

    * [ ] Can you make an author's username a link that displays that users's profile at `/users/:username`?
    * [ ] Can you do the same for comments?
    * [ ] Can you make a `/profile` route that loads the current user and displays their posts and comments?
* [ ] Voting: 
    * [ ] We only allow voting on the home and subreddit screens currently. Allow it on when viewing a single post.
    * [ ] Turn the Vote Up/Vote Down buttons into arrows using CSS and/or JS
    * [ ] Have the vote buttons color change after they've been clicked, and ensure the change is retained during the session (i.e. if you Vote Up, the button should be colored red and should stay that way until the vote changes
* [ ] Authentication:
    * There is a lot more to make a full fledged authentication 
    system.See which ones you want to try:

        * [ ] Add a Remember Me checkbox.What is the difference from when it is checked or not ?
        * [ ] Require a password confirmation field.
        * [ ] Plan out how you would do a "forget password" process.
        * [ ] Can you write another test to test that it is impossible to create a post if a user is not logged in?
        * [ ] Can you make all of your `auth` tests not pass, and then pass? What about your newly updated `post` test?
