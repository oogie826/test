const mongoConn = require('../../database/mongoConn');
const Kindergarten = require('../../database/models/kindergartens');
const User = require('../../database/models/users');

exports.enrollKindergarten = async function(req, resp, next) {
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
        const enrollKinder = Kindergarten.findOneAndUpdate({place_name: updateQuery.place_name}, updateQuery, options, (err, res) => {
            if (err) throw err;
        });

        const enrollKinderInfoToUser = User.findOneAndUpdate({username: updateQuery.username}, {kindergarten_name: updateQuery.place_name}, (err, res) => {
            if (err) throw err;
        })
        
        await Promise.all([enrollKinder, enrollKinderInfoToUser]).then(
            resp.status(200).json({description: 'Enrolled'})
        );

        mongoConn.disconn();
    }
    catch (err) {
        throw err;
    }
    return;
}

exports.getKindergartenInfo = async function (req, resp, next) {
    try {
        console.log(req.body)
        const query = {
            place_name: req.body.place_name,
            address_name: req.body.address_name,
            reg_number: req.body.reg_number
        };

        mongoConn.conn();
        const result = await Kindergarten.find(query);
        console.log(result)
        mongoConn.disconn();
    }
    catch (err) {
        throw err;
    }
    return;
}