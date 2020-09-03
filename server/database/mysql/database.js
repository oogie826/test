const mysql = require('mysql');
const cfg = require('./configs')

function init() {
    return mysql.createConnection(cfg.db);
}

function conn(init) {
    init.connect((err) => {
        if (err) throw err;
        console.log('DB Connected');
    })
}

module.exports = {
    init: init,
    conn: conn
}