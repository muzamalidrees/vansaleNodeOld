var Areas = require('../models/model-areas')

module.exports = function (server) {

    server.post('/addNewArea', (req, res) => {
        var area = { name: req.body.name, area_code: req.body.areaCode }
        Areas
            .findOrCreate({ where: { name: req.body.name }, defaults: area })
            .then(([area, created]) => {
                if (created) {
                    res.json({ success: true, data: area, message: 'Area: ' + area.name + ' registered successfully' })
                }
                if (!created) {
                    res.json({ success: false, message: 'Area: ' + area.name + ' already exists' })
                }
            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })

    server.get('/getAllAreas', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        Areas
            .findAll(
                // { limit: req.body.limit }
            ).then(areas => {

                res.json({ success: true, data: areas })
            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })

}
