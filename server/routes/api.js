const express = require('express')
const router = express.Router()
const cors = require('cors')
const db = require('../database/mysql/database')
const bodyParser = require('body-parser')

router.use(cors())
router.use(bodyParser.json())

router.get('/kinlist', (req, res) => {
    const dbconn = db.init()
    let sql = 'SELECT * FROM KinderGarden'
    const result = dbconn.query(sql, (err, result) => {
        res.send(JSON.stringify(result))
    })
    if (!result) {
        res.status(400).json({ result: false, desc: "Cannot Find"})
    }
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

router.get('/', (req, res) => {
    console.log(req.body)
    res.status(200).json({result: 'OK'});
})

module.exports = router;