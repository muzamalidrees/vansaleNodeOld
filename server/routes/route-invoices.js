var Invoices = require('../models/model-invoices')

module.exports = function (server) {

    server.post('/addNewInvoice', (req, res) => {
        var invoice = { total: req.body.total, type: req.body.type }
        Invoices
            .create(invoice)
            .then((invoice) => {
                res.json({ success: true, data: invoice, message: 'invoice registered successfully' })

            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })
    server.get('/getLastInvoiceID', (req, res) => {

        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        Invoices.findAll(
            {
                limit: 1,
                order: [['id', 'DESC']]
            }
        ).then(invoices => {

            res.json({ success: true, data: invoices })
        })
        .catch((err) => {
            res.json({ success: false, err: err })

        })
    })
}

