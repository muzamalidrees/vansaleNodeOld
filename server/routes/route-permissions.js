var Permissions = require('../models/model-permissions')

module.exports = function (server) {

    server.post('/addNewPermission', (req, res) => {
        var permission = { name: req.body.name }
        Permissions
            .findOrCreate({ where: { name: req.body.name }, defaults: permission })
            .then(([permission, created]) => {

                if (created) {
                    res.json({ success: true, data: permission, message: 'permission: ' + permission.name + ' registered successfully.' })
                }
                if (!created) {
                    res.json({ success: false, message: 'permission with name: ' + permission.name + 'already exists.' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })

    })

    server.get('/getAllPermissions', (req, res) => {
        // Users.findAll({ where: { name: 'abc' } }).then(users => {
        Permissions.findAll(
            // { limit: req.body.limit }
        ).then(permissions => {

            res.json({ success: true, data: permissions })
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