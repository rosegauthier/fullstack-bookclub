const mongoose = require('mongoose');

const BookclubSchema = new mongoose.Schema({
    name: String,
    members: [String]
});

module.exports = mongoose.model('Bookclub', BookclubSchema);