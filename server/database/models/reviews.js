const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    kindergarten_name: { type: String, required: true },
    evaluations: { type: Number },
    comments: { type: String }
});

module.exports = mongoose.model('Review', reviewSchema);