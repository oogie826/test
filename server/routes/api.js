const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');

// routers
const kindergartensRouter = require('./kindergartens/kindergartens.router');
const usersRouter = require('./users/users.router');

router.use(cors());
router.use(bodyParser.json());

router.use('/kindergartens', kindergartensRouter);
router.use('/users', usersRouter);

module.exports = router;