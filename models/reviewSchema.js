const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    comments: {type: String}
});

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review;