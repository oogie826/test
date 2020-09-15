const express = require('express');
const router = express.Router();
const Controller = require('./kindergartens.contoller');

router.post('/input_data', (req, resp, next) => {
    Controller.inputData(req, resp, next);
})

module.exports = router;