const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const db_conn = db.init();
db.conn(db_conn);

const port = process.env.port || 9000;
const front_end = path.join(__dirname, '..', '..', 'build/')
app.use(cors())
app.use(express.static(front_end))
app.use(bodyParser.json())

//app.use('*', (req, res) => {
//    res.sendFile(front_end + 'index.html')
//})

app.get('/api', (req, res) => {
    let sql = 'select * from test'
    db_conn.query(sql, (err, result) => {
        res.send(JSON.stringify(result[0]))
    })
})

app.get('/', (req, res) => {
    res.send({hi: "hi"})
})

module.exports = app;
const server =  app.listen(port, () => {
    console.log(`${port} running.`)
})
module.exports = app;

