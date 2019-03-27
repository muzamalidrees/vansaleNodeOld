var Products = require('../models/model-products')
// var passport = require('passport')

module.exports = function (server) {

    server.post('/addNewProduct', (req, res) => {
        var product = { name: req.body.name, price: req.body.price, description: req.body.description, product_category_id: req.body.category }
        Products
            .findOrCreate({ where: { name: req.body.name }, defaults: product })
            .then(([product, created]) => {

                if (created) {
                    res.json({ success: true, data: product, message: 'product registered successfully' })
                }
                if (!created) {
                    res.json({ success: false, message: 'product already exists' })
                }

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'something went wrong' })

            })
    })

    server.get('/getAllProducts', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        Products
            .findAll(
                // { limit: req.body.limit }
            ).then(products => {

                res.json({ success: true, data: products })
            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.delete('/deleteProduct', (req, res) => {
        Products
            .findOne({ where: { id: req.body.value } })
            .then(product => {
                return product.destroy();
            })
            .then(product => {
                res.json({ success: true, data: product, message: 'product with name: ' + product.name + ' deleted.' })

            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updateProduct', (req, res) => {
        Products
            .findOne({ where: { id: req.body.id } })
            .then(product => {
                product
                    .update({
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
                        product_category_id: req.body.category,
                    })
                    .then((product) => {

                        res.json({ success: true, data: product, message: 'customer with id: ' + product.id + ' updated successfully.' })
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