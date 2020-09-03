const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.port || 9000;
const front_end = path.join(__dirname, '..', '..', 'build/')

app.use(cors())
app.use(express.static(front_end))
app.use(bodyParser.json())

// router
const api = require('./routes/api');
app.use('/api', api)

const server =  app.listen(port, () => {
    console.log(`${port} running.`)
})

module.exports = server;

