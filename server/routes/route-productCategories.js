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
    server.delete('/deletePC', (req, res) => {
        ProductCategories
            .findOne({ where: { id: req.body.value } })
            .then(productCategory => {
                return productCategory.destroy();
            })
            .then(productCategory => {
                res.json({ success: true, data: productCategory, message: 'productCategory with name: ' + productCategory.name + ' deleted.' })

            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updatePC', (req, res) => {
        ProductCategories
            .findOne({ where: { id: req.body.id } })
            .then(productCategory => {
                productCategory
                    .update({
                        name: req.body.name,
                    })
                    .then((productCategory) => {

                        res.json({ success: true, data: productCategory, message: 'productCategory with id: ' + productCategory.id + ' updated successfully.' })
                    })
            })

            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })

}
