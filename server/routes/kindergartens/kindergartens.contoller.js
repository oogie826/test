const mongoConn = require('../../database/mongoConn');
const Kindergarten = require('../../database/models/kindergartens');
const User = require('../../database/models/users');
const getXLSdata = require('./excel')
const qs = require('qs');

exports.enrollKindergarten = async function (req, resp, next) {
    try {
        console.log(req.body)
        const updateQuery = {
            place_name: req.body.place_name,
            address_name: req.body.address_name,
            reg_number: req.body.reg_number,
            username: req.body.username
        };

        const options = {
            upsert: true,
            new: true,
            setDefaultOnInsert: true
        };

        mongoConn.conn();
        const enrollKinder = Kindergarten.findOneAndUpdate({ place_name: updateQuery.place_name }, updateQuery, options, (err, res) => {
            if (err) throw err;
        });

        const enrollKinderInfoToUser = User.findOneAndUpdate({ username: updateQuery.username }, { kindergarten_name: updateQuery.place_name }, (err, res) => {
            if (err) throw err;
        })

        await Promise.all([enrollKinder, enrollKinderInfoToUser]).then(
            resp.status(200).json({ description: 'Enrolled' })
        );

        mongoConn.disconn();
    }
    catch (err) {
        throw err;
    }
    return;
}

exports.enrollReview = async function (req, resp, next) {
    console.log(req.body)
    const updateQuery = {
        $push: {
            reviews: {
                comment: req.body.comment,
                rating: req.body.rating,
                username: req.body.username
            }
        }
    };

    const options = {
        upsert: true,
        new: true,
        setDefaultOnInsert: true
    };
    try {
        mongoConn.conn();
        Kindergarten.findOneAndUpdate({ place_name: req.body.place_name, address_name: req.body.address_name }, updateQuery, options, (err, res) => {
            if (err) throw err;
            mongoConn.disconn();
        });
    }
    catch (err) {
        throw err;
    }
    return resp.status(200).end();
}

exports.getKindergartenInfo = async function (req, resp, next) {
    try {
        const params = qs.parse(req.params.params);
        console.log(params)
        mongoConn.conn();
        const result = await Kindergarten.findOne({ place_name: params.place_name, address_name: params.address_name });
        const xls = await getXLSdata(params.sido, (params.place_name).trim());
        console.log(result)
        console.log(xls)
        mongoConn.disconn();
        if ((xls !== null || xls !== undefined) && result !== null) {
            resp.send({
                kinder_info: result,
                gov_info: xls
            });
            return;
        }
        if ((xls !== null || xls !== undefined) && result === null) {
            resp.send({
                gov_info: xls
            })
            return;
        }
        else {
            resp.json({ error: 'No result' }).send();
            return;
        }
    }
    catch (err) {
        throw err;
    }
    return;
}

exports.getKindergartenInfoByUsername = async function (req, resp, next) {
    try {
        const params = qs.parse(req.params.params);
        console.log(req.params)
        mongoConn.conn();
        const result = await Kindergarten.find({ username: params.username });
        if (result) {
            resp.send(result)
        }
        mongoConn.disconn();
    }
    catch (err) {
        throw err;
    }
    return;
}