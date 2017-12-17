const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    clubID: {
        type: String,
        default: ''
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    locationID: {
        type: String,
        default: ''
    },
    datetime: {
        type: Date,
        default: Date.now
    },
    rsvpList: [String]
});

module.exports = mongoose.model('Meeting', MeetingSchema);