//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Bookworm = require('./models/schema.js')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________


// Edit
// GET /bookworm/:id/edit
app.get('/bookworm/:id/edit', (req, res) => {
    Bookworm.findById(req.params.id, (error, thisBook) => {
        res.render('edit.ejs', {book: thisBook});
    });
});

// Update
// PUT /bookworm/:id
app.put('/bookworm/:id', (req, res) => {
    if(req.body.owned === 'on'){
        req.body.owned = true;
    }else{
        req.body.owned = false;
    };
    if(req.body.read === 'on'){
        req.body.read = true;
    }else{
        req.body.read = false;
    };
    Bookworm.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedNewBook) => {
        res.redirect('/bookworm');
    })
})

// Create
//POST /bookworm.post
app.post('/bookworm', (req,res) => {
    if(req.body.owned === 'on'){
        req.body.owned = true;
    }else{
        req.body.owned = false;
    };
    if(req.body.read === 'on'){
        req.body.read = true;
    }else{
        req.body.read = false;
    };
        Bookworm.create(req.body, (error, newBook) => {
            res.redirect('/bookworm');
        });
    });




// Destroy
// DELETE /bookworm/:id
app.delete('/bookworm/:id', (req, res) => {
    Bookworm.findByIdAndRemove(req.params.id, (error, removeBook) => {
        res.redirect('/bookworm');
    });
});

//New
//GET /bookworm/new
app.get('/bookworm/new', (req, res)=>{
    res.render('new.ejs');
});

//Show
//Get /bookworm/:index
app.get('/bookworm/:id', (req, res) => {
    Bookworm.findById(req.params.id, (error, thisBook) => {
        res.render('show.ejs',{book: thisBook});
    });
});

// Index
//GET bookworm
app.get('/bookworm', (req, res) => {
    Bookworm.find({}, (error, allBooks) => {
        res.render('index.ejs', {book: allBooks});
    });
});

//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));