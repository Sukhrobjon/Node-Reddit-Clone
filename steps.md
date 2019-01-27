##Learning outcomes
* [ ] Implement a large scale application using Express, Handlebars, and MongoDB/Mongoose
* [ ] Implement an authentication flow through JWTs that allows users to sign up, log in, and log out, and restricts functionality based on authentication status
* [ ] Investigate how to use the populate method in Mongoose for advanced associations
* [ ] Implement more intricate tests for CRUD apps as well as for authentication flows.

1. `npm init, npm install express --save`
2. `npm install express-handlebars --save`
    var exphbs = require('express-handlebars');

- why use `unshift` instead of `push` 
`unshift` adds an element to the front of an array, while `push` adds it to the end. Reddit puts its newest comments at the top, so we want the default order to be reverse chronological order.

4. Just the id's right? When we do a reference association, we only save the id's into the parent's document. In order to replace these id's with the actual child document, we have to use the mongoose function `.populate()` when we fetch the parent from the database.

