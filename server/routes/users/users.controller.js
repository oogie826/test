const mongoConn = require('../../database/mongoConn');
const User = require('../../database/models/users');
const Kindergarten = require('../../database/models/kindergartens');
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = 'SECRET_KEY';

exports.signUp = async function(req, resp, next) {
    try {
        mongoConn.conn();
        console.log(req.body)
        const query = {
            username: req.body.username,
            password: req.body.password.trim(),
        };

        await new User(query).save((err, res) => {
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

exports.login = async function(req, resp, next) {
    try {
        mongoConn.conn();
        console.log(req.body)
        const query = {
            username: req.body.username,
            password: req.body.password.trim(),
        };

        await User.findOne(query, (err, res) => {
            console.log(res)
            if (res === null) {
                resp.status(404).json({msg: "Can't find"});
                return
            }
            const token = jwt.sign({
                username: res.username,
                auth: res.auth
            }, 
            JWT_SECRET_KEY,
            {
                expiresIn: '30m'
            });

            resp.status(200).json({
                access_token: token
            })
        })
        mongoConn.disconn();
    }
    catch (err) {
        throw err;
    }
    return;
}