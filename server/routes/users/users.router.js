const express = require('express');
const router = express.Router();
const Controller = require('./users.controller');

router.post('/signup', (req, resp, next) => {
    Controller.signUp(req, resp, next);
})

module.exports = router;