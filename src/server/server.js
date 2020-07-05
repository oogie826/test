const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// router
const api = require('./routes/api');
app.use('/api', api)

const port = process.env.port || 9000;
const front_end = path.join(__dirname, '..', '..', 'build/')
app.use(cors())
app.use(express.static(front_end))
app.use(bodyParser.json())

module.exports = app;
const server =  app.listen(port, () => {
    console.log(`${port} running.`)
})
module.exports = app;

