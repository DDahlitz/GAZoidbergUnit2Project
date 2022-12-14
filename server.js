
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

const PORT = process.env.PORT || 3003;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method'));

const reviewsController = require('./controllers/reviews.js');
app.use('/reviews',reviewsController);

const booksController = require('./controllers/bookworm.js');
app.use('/bookworm', booksController);

app.listen(PORT, () => console.log( 'Listening on port:', PORT));