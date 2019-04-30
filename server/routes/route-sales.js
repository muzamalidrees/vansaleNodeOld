var Inventory = require('../models/model-inventory')
var Sales = require('../models/model-sales')

module.exports = function (server) {

    server.all('/addNewSale', (req, res) => {
        var sale = { customer_id: req.body.customer, product_id: req.body.product, rate: req.body.rate, qty: req.body.qty, discount: req.body.discount, price: req.body.price, invoice_id: req.body.invoice }
        Sales
            .create(sale)
            .then((sale) => {
                res.json({ success: true, data: sale, message: 'sales registered successfully' })
            })

            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })
}