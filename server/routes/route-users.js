var Users = require('../models/model-users')

module.exports = function (server) {

    server.post('/addNewUser', (req, res) => {
        var user = { name: req.body.name, email: req.body.email, cell: req.body.cell, address: req.body.address, username: req.body.username, password: req.body.password, role_id: req.body.role }
        Users
            .findOrCreate({ where: { email: req.body.email }, defaults: user })
            .then(([user, created]) => {

                if (created) {
                    res.json({ success: true, data: user, message: 'user: ' + user.name + ' registered successfully.' })
                }
                if (!created) {
                    res.json({ success: false, message: 'user with email: ' + user.email + 'already exists.' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })

    })

    server.get('/getAllUsers', (req, res) => {
        // Users.findAll({ where: { name: 'abc' } }).then(users => {
        Users.findAll(
            // { limit: req.body.limit }
        ).then(users => {

            res.json({ success: true, data: users })
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