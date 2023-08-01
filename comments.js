// Create web server
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Connect to database
var db = mongoose.connect('mongodb://localhost:27017/test');

// Create schema
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: String,
    comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Create new comment
var newComment = Comment({
    name: 'John',
    comment: 'I am a comment'
});

// Save comment
newComment.save(function(err) {
    if (err) throw err;
    console.log('Comment saved!');
});

// Get all comments
router.get('/comments', function(req, res, next) {
    res.render('comments');
});

module.exports = router;
```
I have a comments.jade file that I want to render the comments to:
```
extends layout

block content
    h1= title
    p Welcome to #{title}

    ul
        each comment, i in comment
            li= comment[i].comment
```
I am trying to create a new comment and then render it in the comments.jade file, but I am not sure how to do this. I am new to Node.js and MongoDB. How can I accomplish this?
OP 2015-10-28: I figured it out. I needed to use the find() method to get all the comments from the database and then pass it to the comments.jade file. Here is the code:
```
// Path: comments.js
// Create web server
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Connect to database
var db = mongoose.connect('mongodb://localhost:27017/test');

// Create schema
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: String,
    comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Create new comment
var newComment = Comment({
    name: 'John',
    comment: 'I am a comment'
});

// Save comment
newComment.save(function(err) {
    if (err) throw err;
    console.log('Comment saved!');
});

// Get all comments
router.get('/comments', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) throw