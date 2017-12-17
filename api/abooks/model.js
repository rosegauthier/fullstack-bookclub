const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    synopsis: String,
    coverUrl: String,
    clubID: String,
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model('Book', BookSchema);