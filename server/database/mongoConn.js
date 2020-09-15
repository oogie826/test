const mongoose = require('mongoose');
const db_config = require('./config')

mongoose.set('useFindAndModify', false);

const mdbConn = () => {
    mongoose.connect(db_config.uri, db_config.options, (err) => {
        if (err) throw err;
        console.log('MongoDB connected.');
    });
}

const mdbDisconn = () => {
    mongoose.disconnect();
    console.log('MongoDB Disconnected.');
}


module.exports = {
    conn: mdbConn,
    disconn: mdbDisconn
}