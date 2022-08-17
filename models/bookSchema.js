const mongoose = require('mongoose');
const Review = require('./reviewSchema.js');


const bookwormSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true,
        required:true
        },
    genre: {type: String},
    author: {type: String},
    img: {
        type: String, 
        unique: true, 
        required: true
        },
    description: {type: String},
    price: {type: Number,},
    read: {
        type: Boolean,
        default: false
        },
    owned: {
        type: Boolean,
        default: false
        },
    reviews: [Review.schema]
});

const Bookworm = mongoose.model('Bookworm', bookwormSchema)

module.exports = Bookworm;