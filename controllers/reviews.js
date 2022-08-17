const express = require('express');
const router = express.Router();
const Review = require('../models/reviewSchema.js')
const Bookworm = require('../models/bookSchema.js')




// //___________________
// // Routes
// //___________________



router.get('/new', (req, res)=>{
    Bookworm.find({}, (err, allBooks)=>{
        res.render('reviews/new.ejs', {
            books: allBooks
        });
    });
});


router.post('/', (req, res)=>{
    Bookworm.findById(req.body.bookId, (err, foundBook)=>{
        Review.create(req.body, (err, createdReview)=>{
            foundBook.reviews.push(createdReview);
            foundBook.save((err, data)=>{
                res.redirect('/reviews');
            });
        });
    });
});



router.get('/:id', (req, res)=>{
    Review.findById(req.params.id, (err, foundReview)=>{
        Bookworm.findOne({'reviews._id':req.params.id}, (err, foundBook)=>{
            res.render('reviews/show.ejs', {
                book: foundBook,
                comment: foundReview
            });
        })
    });
});



router.put('/:id', (req, res)=>{
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedReview)=>{
        Bookworm.findOne({ 'reviews._id' : req.params.id }, (err, foundBook)=>{
            foundBook.reviews.id(req.params.id).remove();
            foundBook.reviews.push(updatedReview);
            foundBook.save((err, data)=>{
                res.redirect('/reviews/'+req.params.id);
            });
        });
    });
});


router.delete('/:id', (req, res)=>{
    Review.findByIdAndRemove(req.params.id, (err, foundReview)=>{
        Bookworm.findOne({'reviews._id':req.params.id}, (err, foundBook)=>{
            foundBook.reviews.id(req.params.id).remove();
            foundBook.save((err, data)=>{
                res.redirect('/reviews');
            });
        });
    });
});



router.delete('/:id', (req, res)=>{
	Bookworm.findByIdAndRemove(req.params.id, (err, foundBook)=>{
		const reviewIds = [];
		for (let i = 0; i < foundBook.comments.length; i++) {
			reviewIds.push(foundBook.comments[i]._id);
		}
		Review.remove(
			{
				_id : {
					$in: reviewIds
				}
			},
			(err, data)=>{
				res.redirect('/bookworm');
			}
		);
	});
});


router.get('/:id/edit', (req, res)=>{
	Review.findById(req.params.id, (err, foundReview)=>{
		Bookworm.find({}, (err, allBooks)=>{
			Bookworm.findOne({'reviews._id':req.params.id}, (err, foundBookReview)=>{
				res.render('reviews/edit.ejs', {
					comment: foundReview,
					books: allBooks,
					bookReview: foundBookReview
				});
			});
		});
	});
});


router.put('/:id', (req, res)=>{
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedReview)=>{
        Bookworm.findOne({ 'reviews._id' : req.params.id }, (err, foundBook)=>{
		if(foundBook._id.toString() !== req.body.bookId){
			foundBook.reviews.id(req.params.id).remove();
			foundBook.save((err, savedFoundBook)=>{
				Bookworm.findById(req.body.bookId, (err, newBook)=>{
					newBook.reviews.push(updatedReview);
					newBook.save((err, savedNewBook) => {
			        	res.redirect('/reviews/'+req.params.id);
					});
				});
			});
		} else {
			foundBook.reviews.id(req.params.id).remove();
			foundBook.reviews.push(updatedReview);
			foundBook.save((err, data)=>{
		        res.redirect('/reviews/'+req.params.id);
			});
		}
        });
    });
});


router.get('/', (req, res)=>{
	Review.find({}, (err, foundReviews)=>{
		res.render('reviews/index.ejs', {
			review: foundReviews
		});
	})
});


module.exports = router;