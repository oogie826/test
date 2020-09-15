const mongoConn = require('../../database/mongoConn');
const User = require('../../database/models/users');
const Kindergarten = require('../../database/models/kindergartens');

exports.signUp = async function(req, resp, next) {
    try {
        mongoConn.conn();
        const query = {
            username: req.body.userInfo.username,
            fullname: req.body.userInfo.fullname,
            password: req.body.userInfo.password,
            kindergarten_name: req.body.userInfo.kindergarten_name,
            auth: req.body.userInfo.auth,
        };

        await new User(query).save((err, res) => {
            if (err) throw err;
            resp.status(201).json({
                description: 'Sign-up succeed'
            })
            mongoConn.disconn();
        })
    }
    catch (err) {
        throw err;
    }
    return;
}