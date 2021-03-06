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
            password: req.body.password,
            parent: req.body.parent,
            teacher: req.body.teacher
        };

        await new User(query).save((err, res) => {
            if (err) throw err;
            mongoConn.disconn();
        })
        resp.status(200).send();
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
                child_name: res.child_name,
                place_name: res.place_name,
                parent: res.parent,
                teacher: res.teacher,
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

exports.enrollUserChild = async function (req, resp, next) {
    try {
        console.log(req.body)
        const query = {
            username: req.body.username,
            child_name: req.body.child_name,
        };
        const options = {
            upsert: true
        };
        mongoConn.conn();
        await User.findOneAndUpdate({username: req.body.username}, query, (err, res) => {
            if (err) throw err;
        })
        resp.status(200).end();
        mongoConn.disconn();
    }
    catch (err) {
        console.error(err);
        next(err);
    }
    return;
}