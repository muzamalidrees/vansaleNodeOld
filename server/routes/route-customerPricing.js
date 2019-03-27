var CustomerPricing = require('../models/model-customerPricing')

module.exports = function (server) {

    server.post('/customerPricing', (req, res) => {
        var customerPriceGroup = { customer_id: req.body.customer, price_group_id: req.body.priceGroup }
        CustomerPricing
            .findOrCreate({ where: customerPriceGroup, defaults: customerPriceGroup })
            .then(([customerPriceGroup, created]) => {
                if (created) {
                    res.json({ success: true, msg: 'created', data: customerPriceGroup, customerID: req.body.customer, priceGroupID: req.body.priceGroup })
                }
                if (!created) {
                    res.json({ success: false, msg: 'existing', data: customerPriceGroup, customerID: req.body.customer, priceGroupID: req.body.priceGroup })
                }
            })
            .catch((err) => {
                res.json({ success: false, err: err, msg: 'error' })

            })
    })

    server.get('/getAllCustomerPricing', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        CustomerPricing.findAll(
            // { limit: req.body.limit }
        ).then(customerPrices => {

            res.json({ success: true, data: customerPrices })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.delete('/deleteCP', (req, res) => {
        CustomerPricing
            .findOne({ where: { id: req.body.value } })
            .then(customerPriceGroup => {
                return customerPriceGroup.destroy();
            })
            .then(customerPriceGroup => {
                res.json({ success: true, data: customerPriceGroup, message: 'customerPriceGroup with name: ' + customerPriceGroup.name + ' deleted.' })

            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updateCP', (req, res) => {
        CustomerPricing
            .findOne({ where: { id: req.body.id } })
            .then(customerPriceGroup => {
                customerPriceGroup
                    .update({
                        customer_id: req.body.customer,
                        price_group_id: req.body.priceGroup,
                    })
                    .then((customerPriceGroup) => {

                        res.json({ success: true, data: customerPriceGroup, message: 'customerPriceGroup with id: ' + customerPriceGroup.id + ' updated successfully.' })
                    })
            })

            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })

}
