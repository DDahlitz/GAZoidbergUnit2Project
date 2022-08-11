const mongoose = require('mongoose');

const bookwormSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    genre: {type: String, require: true},
    author: {type: String},
    img: {type: String, unique: true},
    description: {type: String, require: true},
    read: {type: Boolean, require: true},
    owned: {type: Boolean, require: true},
    price: {type: Number,}
});

const Bookworm = mongoose.model('Bookworm', bookwormSchema)

module.exports = Bookworm;