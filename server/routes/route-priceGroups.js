var PriceGroups = require('../models/model-priceGroups')

module.exports = function (server) {

    server.post('/addNewPriceGroup', (req, res) => {
        var priceGroup = { name: req.body.name, product_category_id: req.body.category, price: req.body.price, buying_back_price: req.body.BBPrice }
        PriceGroups
            .findOrCreate({ where: { name: req.body.name }, defaults: priceGroup })
            .then(([priceGroup, created]) => {
                if (created) {
                    res.json({ success: true, data: priceGroup, message: 'price group registered successfully' })
                }
                if (!created) {
                    res.json({ success: false, message: 'price group already exists' })
                }
            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })

    server.get('/getAllPriceGroups', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        PriceGroups.findAll(
            // { limit: req.body.limit }
        ).then(priceGroups => {

            res.json({ success: true, data: priceGroups })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.delete('/deletePG', (req, res) => {
        PriceGroups
            .findOne({ where: { id: req.body.value } })
            .then(priceGroup => {
                return priceGroup.destroy();
            })
            .then(priceGroup => {
                res.json({ success: true, data: priceGroup, message: 'priceGroup with name: ' + priceGroup.name + ' deleted.' })

            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updatePG', (req, res) => {
        PriceGroups
            .findOne({ where: { id: req.body.id } })
            .then(priceGroup => {
                priceGroup
                    .update({
                        name: req.body.name,
                        price: req.body.price,
                        buying_back_price: req.body.bbprice,
                        product_category_id: req.body.category,
                    })
                    .then((priceGroup) => {

                        res.json({ success: true, data: priceGroup, message: 'priceGroup with id: ' + priceGroup.id + ' updated successfully.' })
                    })
            })

            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })

}
