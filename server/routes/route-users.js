var Users = require('../models/model-users')
var passport = require('passport')

module.exports = function (server) {
    server.post('/login', passport.authenticate('local'), function (req, res) {
        res.redirect('/ohome');
    });

    server.get('/ohome', function (req, res) {

        if (!req.isAuthenticated()) {
            res.send({ success: 'false', route: '/ohome' })
            res.send("login required to visit this page")
        }
        else {
            res.send({ success: 'logged in', route: '/ohome' })
        }

    });

    server.post('/addNewUser', (req, res) => {
        var user = { name: req.body.name, email: req.body.email, cell: req.body.cell, address: req.body.address, username: req.body.username, password: req.body.password }
        Users.create(user)
            .then((user) => {
                res.json({ success: true, data: user })
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