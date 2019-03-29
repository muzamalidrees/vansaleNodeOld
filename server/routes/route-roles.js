var Roles = require('../models/model-roles')

module.exports = function (server) {

    server.post('/addNewRole', (req, res) => {
        var role = { name: req.body.name }
        Roles
            .findOrCreate({ where: { name: req.body.name }, defaults: role })
            .then(([role, created]) => {

                if (created) {
                    res.json({ success: true, data: role, message: 'role: ' + role.name + ' registered successfully.' })
                }
                if (!created) {
                    res.json({ success: false, message: 'role with name: ' + role.name + 'already exists.' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })

    })

    server.get('/getAllRoles', (req, res) => {
        // Users.findAll({ where: { name: 'abc' } }).then(users => {
        Roles.findAll(
            // { limit: req.body.limit }
        ).then(roles => {

            res.json({ success: true, data: roles })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.delete('/deleteRole', (req, res) => {
        Roles
            .findOne({ where: { id: req.body.value } })
            .then(role => {
                return role.destroy();
            })
            .then(role => {
                res.json({ success: true, data: role, message: 'role with name: ' + role.name + ' deleted.' })

            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updateRole', (req, res) => {
        Roles
            .findOne({ where: { id: req.body.id } })
            .then(role => {
                role
                    .update({
                        name: req.body.name,
                    })
                    .then((role) => {

                        res.json({ success: true, data: role, message: 'role with id: ' + role.id + ' updated successfully.' })
                    })
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