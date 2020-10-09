const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    password: { type: String, required: true },
    child_name: { type: String },
    place_name: { type: String },
    auth: {type: String, default: 'guest'}
});
// auth: 'guest', 'teacher', 'parent' 

module.exports = mongoose.model('User', userSchema);