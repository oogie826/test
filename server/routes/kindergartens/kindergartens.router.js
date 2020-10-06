const express = require('express');
const router = express.Router();
const Controller = require('./kindergartens.contoller');

router.post('/enroll-kindergarten', (req, resp, next) => {
    Controller.enrollKindergarten(req, resp, next);
});

router.post('/enroll-review', (req, resp, next) => {
    Controller.enrollReview(req, resp, next);
});

router.get('/get-info/:params', (req, resp, next) => {
    Controller.getKindergartenInfo(req, resp, next);
});

router.get('/get-info/username/:params', (req, resp, next) => {
    Controller.getKindergartenInfoByUsername(req, resp, next);
});

module.exports = router;