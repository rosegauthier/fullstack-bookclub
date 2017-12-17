const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    content: String,
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bookID: String,
    upvotes: Number,
    downvotes: Number
});

module.exports = mongoose.model('Discussion', DiscussionSchema);