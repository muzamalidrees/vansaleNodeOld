var ProductCategories = require('../models/model-productCategories')

module.exports = function (server) {

    server.post('/addNewProductCategory', (req, res) => {
        var productCategory = { name: req.body.name }
        ProductCategories
            .findOrCreate({ where: { name: req.body.name }, defaults: productCategory })
            .then(([productCategory, created]) => {
                if (created) {
                    res.json({ success: true, data: productCategory, message: 'Product Category: ' + productCategory.name + ' registered successfully' })
                }
                if (!created) {
                    res.json({ success: false, message: 'product category: ' + productCategory.name + ' already exists' })
                }
            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })

    server.get('/getAllProductCategories', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        ProductCategories.findAll(
            // { limit: req.body.limit }
        ).then(productCategories => {

            res.json({ success: true, data: productCategories })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })

}
