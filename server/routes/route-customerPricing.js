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
}
