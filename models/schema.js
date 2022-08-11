const mongoose = require('mongoose');

const bookwormSchema = new mongoose.Schema({
    name: {type: String},
    genre: {type: String},
    author: {type: String},
    img: {type: String},
    description: {type: String},
    read: {type: Boolean},
    owned: {type: Boolean},
    price: {type: Number,}
});

const Bookworm = mongoose.model('Bookworm', bookwormSchema)

module.exports = Bookworm;