var Drivers = require('../models/model-drivers')
var passport = require('passport')

module.exports = function (server) {

    server.post('/addNewDriver', (req, res) => {
        var driver = { name: req.body.name, email: req.body.email, cell: req.body.cell, address: req.body.address, area_id: req.body.area, route_id: req.body.route }
        Drivers
            .findOrCreate({ where: { email: req.body.email }, defaults: driver })
            .then(([driver, created]) => {

                if (created) {
                    res.json({ success: true, data: driver, message: 'driver registered successfully' })
                }
                if (!created) {
                    res.json({ success: false, message: 'driver already exists' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })
    })

    server.get('/getAllDrivers', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        Drivers.findAll(
            // { limit: req.body.limit }
        ).then(drivers => {

            res.json({ success: true, data: drivers })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
}





























// var con = require('../configs/db-config-mysql')

// module.exports = function (server) {

//     server.post('/addNewUser', (req, res) => {
//         var user = {
//             name: req.body.name,
//             email: req.body.email,
//             cell: req.body.cell,
//             address: req.body.address,
//             username: req.body.username,
//             password: req.body.password
//         }
//         var sql = `INSERT INTO users (name, email, cell, address, username, password) VALUES ('${user.name}','${user.email}','${user.cell}','${user.address}','${user.username}','${user.password}')`;
//         con.query(sql, function (err, result) {
//             if (err) {
//                 // throw err
//                 return res.json({ success: false, err: err })
//             }
//             res.json({ success: true, data: user, id: result.insertId })
//         }
//         );


//     })
// }