const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    rating: { type: Number },
    comment: { type: String }
});

module.exports = mongoose.model('Review', reviewSchema);