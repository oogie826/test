const express = require('express')
const router = express.Router()
const cors = require('cors')
const db = require('../database')
const bodyParser = require('body-parser')

router.use(cors())
router.use(bodyParser.json())

router.get('/kinlist', (req, res) => {
    const dbconn = db.init()
    let sql = 'SELECT * FROM KinderGarden'
    dbconn.query(sql, (err, result) => {
        res.send(JSON.stringify(result))
    })
    dbconn.end()
})

router.post('/kininputs', (req, res) => {
    const dbconn = db.init()
    console.log(req)
    console.log(req.body)

    const dat = req.body.inputs
    console.log(dat)
    let sql = `INSERT INTO KinderGarden VALUES(?, ?, ?, ?, ?)`;
    let dats = [dat.writer, dat.teachers, dat.program, dat.overall, dat.comment]
    dbconn.query(sql, dats, (err ,result) => {
        res.send(result)
    })
    dbconn.end()
})

router.post('/check', (req, res) => {
    console.log(req.body)
    res.status(200)
})

module.exports = router;