var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const Bookclub = require('./api/bookclubs/model.js');
const Meeting = require('./api/meetings/model.js');
const Book = require('./api/books/model.js');
const User = require('./api/users/model.js');
const Discussion = require('./api/discussion/model.js');
const requireLogin = require('./require_login');

passport.use(User.createStrategy());
app.use(bodyParser.json());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(session({ secret: process.env.COOKIE_SECRET, resave: false, saveUninitialized: true }));

mongoose.connect(process.env.MONGODB_SERVER);
// mongoose.connect('mongodb://localhost/bookclub');
app.use(passport.initialize());
app.use(passport.session());

// This serves all files placed in the /public
// directory (where gulp will build all React code)
app.use(express.static('public'));

// Also serve everything from our assets directory (static
// assets that you want to manually include)
app.use(express.static('assets'));

// Include your own logic here (so it has precedence over the wildcard
// route below)

app.get('/api/logout', (req, res) => {
    req.logout();
    res.json('User logged out.');
})

app.get('/api/me', (req, res) => {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).json({ message: "No user session found." })
    }
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
});

app.post('/api/signup', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });

    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            res.status(500).send(err);
        } else {
            req.logIn(user, (err) => {
                res.status(200).send(user);
            });
        }
    });
});

app.get('/api/bookclubs', function(req, res) {
    Bookclub.find({}, { name: 1 })
        .then(docs => res.status(200).send(docs))
        .catch(err => res.status(400).send(err));
});

app.get('/api/bookclubs/:id', function(req, res) {
    Bookclub.findOne({ _id: req.params.id})
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(err));
});

app.post('/api/bookclubs', function(req, res) {
    console.log(req.body)
    const bookclubModel = new Bookclub;
    const bookclub = Object.assign(bookclubModel, req.body);
    bookclub.save()
        .then(doc => {
            res.status(200).send(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/api/meetings/byclub/:id', function(req, res) {
    // send them back with most recent/upcoming meetings first
    Meeting.find({ clubID: req.params.id }).sort({"datetime": -1}).populate('book').exec()
        .then(docs => res.status(200).send(docs))
        .catch(err => res.status(400).send(err));
});

app.get('/api/meetings/:id', function(req, res) {
    Meeting.findOne({ _id: req.params.id }).populate('book').exec()
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(400).send(err));
});

app.post('/api/meetings', function(req, res) {
    console.log(req.body)
    const meetingModel = new Meeting;
    const meeting = Object.assign(meetingModel, req.body);
    meeting.save()
        .then(doc => {
            res.status(200).send(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.put('/api/meetings/:id', function(req, res) {

    const meeting = req.body;
    console.log(meeting)
    Meeting.findById(req.params.id)
        .then(doc => {
            delete req.body._id;
            const updatedMeeting = Object.assign(doc, meeting);
            updatedMeeting.save()
                .then(doc => {
                    console.log(doc)
                    res.status(200).send(doc);
                })
                .catch(err => {
                    res.status(500).send(err);
                });
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/api/discussion/:id', function(req, res) {
    Discussion.find({bookID: req.params.id}).populate('submittedBy').exec()
        .then(docs => res.status(200).send(docs))
        .catch(err => res.status(404).send(err));
})

app.post('/api/discussion', function(req, res) {
    const discussionModel = new Discussion;
    const discussion = Object.assign(discussionModel, req.body);
    discussion.submittedBy = req.user._id;

    discussion.save()
        .then(doc => {
            res.status(200).send(doc);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

app.get('/api/books', function(req, res) {
    Book.find({}).sort({"title": 1})
        .then(docs => res.status(200).send(docs))
        .catch(err => rest.status(400).send(err));
});

app.post('/api/books', function(req, res) {
    console.log(req.body)
    const bookModel = new Book;
    const book = Object.assign(bookModel, req.body);
    book.save()
        .then(doc => res.status(200).send(doc))
        .catch(err => res.status(500).send(err));
});

// This route serves your index.html file (which
// initializes React)
app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname,'index.html'));
});

// Start your server, and listen on port 8080.
app.listen(process.env.PORT, function() {
  console.log("App is now listening on port 8080!");
})
