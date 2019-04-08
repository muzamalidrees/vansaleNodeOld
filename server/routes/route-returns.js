var Returns = require('../models/model-returns')

module.exports = function (server) {

    server.post('/addNewReturn', (req, res) => {
        var returns = { customer_id: req.body.customer, product_id: req.body.product, rate: req.body.rate, qty: req.body.qty, discount: req.body.discount, price: req.body.price, invoice_id: req.body.invoice }
        Returns
            .create(returns)
            .then((returns) => {
                res.json({ success: true, data: returns, message: ' registered successfully' })
            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })
}