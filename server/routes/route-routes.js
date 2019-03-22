var Routes = require('../models/model-routes')
var passport = require('passport')

module.exports = function (server) {

    server.post('/addNewRoute', (req, res) => {
        var route = { name: req.body.name, description: req.body.description, area_id: req.body.area }
        Routes
            .findOrCreate({ where: { name: req.body.name }, defaults: route })
            .then(([route, created]) => {

                if (created) {
                    res.json({ success: true, data: route, message: 'route registered successfully' })
                }
                if (!created) {
                    res.json({ success: false, message: 'route already exists' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })
    })

    server.get('/getAllRoutes', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        Routes.findAll(
            // { limit: req.body.limit }
        ).then(routes => {

            res.json({ success: true, data: routes })
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