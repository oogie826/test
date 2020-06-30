const mysql = require('mysql');

db_config = {
    host: "localhost",
    user: "manager",
    password: "manager",
    database: "mydata"
};

function init() {
    return mysql.createConnection(db_config);
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