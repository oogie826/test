const mongoConn = require('../../database/mongoConn');
const Kindergarten = require('../../database/models/kindergartens');

exports.enrollKindergarten = async function(req, resp, next) {
    try {
        const updateQuery = {
            kindergarten_name: req.body.val,
            location: req.body.val,
        };

        const options = {
            upsert: true,
            new: true,
            setDefaultOnInsert: true
        };
        
        mongoConn.conn();
        await new Kindergarten(updateQuery).save((err, res) => {
            if (err) throw err;
            resp.status(201).json({
                description: 'Test input data updated'
            })
            mongoConn.disconn();
        });
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
            kindergarten_name: req.body.kindergarten_name,
            address_name: req.body.address_name
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