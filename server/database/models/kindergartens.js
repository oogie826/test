const mongoose = require('mongoose');
const reviewSchema = require('./reviews').schema;

const dailyWorkSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    teacher_name: { type: String, required: true },
    text: { type: String }
});

const introSchema = new mongoose.Schema({
    intro: {type: String},
    teachers: {type: String}
});

const kinderGartenSchema = new mongoose.Schema({
    username: { type: String },
    place_name: { type: String, required: true },
    address_name: { type: String, required: true },
    reg_number: { type: String },
    reviews: [reviewSchema],
    daily_work: [dailyWorkSchema],
    meals: [],
    notifications: [],
    intro: introSchema
});

module.exports = mongoose.model('Kindergarten', kinderGartenSchema);