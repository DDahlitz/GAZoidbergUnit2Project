const express = require('express');
const router = express.Router();
const Bookworm = require('../models/bookSchema.js')
const Review = require('../models/reviewSchema.js')
const bookSeed = require('../models/bookSeed.js')




//___________________
// Routes
//___________________

router.get('/new', (req, res)=>{
    res.render('book/new.ejs');
});

router.get('/:id/edit', (req, res) => {
    Bookworm.findById(req.params.id, (error, thisBook) => {
        res.render('book/edit.ejs', {book: thisBook});
    });
});

router.get('/seed', (req,res) => {
    Bookworm.create(bookSeed, (error, data) => {})
    res.redirect('/bookworm');
});

router.put('/:id', (req, res) => {
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

router.post('/', (req,res) => {
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

router.delete('/:id', (req, res) => {
    Bookworm.findByIdAndRemove(req.params.id, (error, removeBook) => {
        res.redirect('/bookworm');
    });
});

router.get('/:id', (req, res) => {
    Bookworm.findById(req.params.id, (error, thisBook) => {
        res.render('book/show.ejs',{book: thisBook});
    });
});

router.get('/', (req, res) => {
    Bookworm.find({}, (error, allBooks) => {
        res.render('book/index.ejs', {book: allBooks});
    });
});

module.exports = router;