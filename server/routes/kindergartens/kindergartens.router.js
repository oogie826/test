const express = require('express');
const router = express.Router();
const Controller = require('./kindergartens.contoller');

router.post('/enroll-kindergarten', (req, resp, next) => {
    Controller.enrollKindergarten(req, resp, next);
});

router.post('/get-info', (req, resp, next) => {
    Controller.getKindergartenInfo(req, resp, next);
});

module.exports = router;