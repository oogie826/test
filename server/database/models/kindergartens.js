const mongoose = require('mongoose');
const reviewSchema = require('./reviews').schema;

const dailyWorkSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    teacher_name: { type: String, required: true },
    text: { type: String }
})

const kinderGartenSchema = new mongoose.Schema({
    kindergarten_name: { type: String, required: true },
    address_name: { type: String, required: true },
    registraion_number: { type: String },
    reviews: [reviewSchema],
    daily_work: [dailyWorkSchema]
});

module.exports = mongoose.model('Kindergarten', kinderGartenSchema);