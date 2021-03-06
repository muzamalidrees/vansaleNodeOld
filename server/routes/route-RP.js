var RP = require('../models/model-RP')

module.exports = function (server) {

    server.post('/addNewRP', (req, res) => {
        var rolePermission = { role_id: req.body.role, permission_id: req.body.permission }
        RP
            .findOrCreate({ where: { role_id: req.body.role }, defaults: rolePermission })
            .then(([rolePermission, created]) => {

                if (created) {
                    res.json({ success: true, role_id: rolePermission.role_id, permission_id: rolePermission.permission_id, message: 'created' })
                }
                if (!created) {
                    res.json({ success: false, role_id: rolePermission.role_id, permission_id: rolePermission.permission_id, message: 'existing' })
                }

            })
            .catch((err) => {
                res.json({ success: false, message: 'error' })

            })

    })
    server.delete('/deleteRP', (req, res) => {
        RP
            .findOne({ where: { id: req.body.value } })
            .then(rp => {
                return rp.destroy();
            })
            .then(rp => {
                res.json({ success: true, data: rp, message: 'RP with id: ' + rp.id + ' deleted.' })

            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })

    server.get('/getAllRolesPermissions', (req, res) => {
        // Users.findAll({ where: { name: 'abc' } }).then(users => {
        RP.findAll(
            // { limit: req.body.limit }
        ).then(RPs => {

            res.json({ success: true, data: RPs })
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