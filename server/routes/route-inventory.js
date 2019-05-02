var Inventory = require('../models/model-inventory')

module.exports = function (server) {

    server.post('/addNewInventory', (req, res) => {
        var inventory = { name: req.body.name, description: req.body.description, rate: req.body.rate, qty: req.body.qty, price: req.body.price }
        Inventory
            .create(inventory)
            .then((inventory) => {

                res.json({ success: true, data: inventory, message: 'inventory registered successfully' })
            })
            .catch((err) => {
                res.json({ success: false, err: err, message: 'somehting went wrong' })

            })
    })

    server.get('/getAllInventory', (req, res) => {
        // Customers.findAll({ where: { name: 'abc' } }).then(customers => {
        Inventory.findAll(
            // { limit: req.body.limit }
        ).then(inventory => {

            res.json({ success: true, data: inventory })
        })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.delete('/deleteInventory', (req, res) => {
        Inventory
            .findOne({ where: { id: req.body.id } })
            .then(inventory => {
                return inventory.destroy();
            })
            .then(inventory => {
                res.json({ success: true, data: inventory, message: 'inventory with name: ' + inventory.name + ' deleted.' })
            })

            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updateInventory', (req, res) => {
        Inventory
            .findOne({ where: { id: req.body.id } })
            .then(inventory => {
                inventory
                    .update({
                        name: req.body.name,
                        description: req.body.description,
                        rate: req.body.rate,
                        qty: req.body.qty,
                        price: req.body.price
                    })
                    .then((inventory) => {

                        res.json({ success: true, data: inventory, message: 'inventory with id: ' + inventory.id + ' updated successfully.' })
                    })
            })

            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.put('/updateSalesItemQty', (req, res) => {
        Inventory
            .findOne({ where: { name: req.body.productName } })
            .then(inventory => {
                let comingQty = req.body.qty;
                let existingQty = inventory.qty;
                let updatedQty = existingQty - comingQty
                inventory
                    .update({
                        qty: updatedQty
                    })
                    .then((inventory) => {
                        res.json({ success: true, data: inventory, message: 'inventory with id: ' + inventory.id + ' updated successfully.' })
                    })
            })
            .catch((err) => {
                res.json({ success: false, err: err })
            })
    })
    server.put('/updateReturnsItemQty', (req, res) => {
        Inventory
            .findOne({ where: { name: req.body.productName } })
            .then(inventory => {
                let comingQty = req.body.qty;
                let existingQty = inventory.qty;
                let updatedQty = existingQty + comingQty
                inventory
                    .update({
                        qty: updatedQty
                    })
                    .then((inventory) => {
                        res.json({ success: true, data: inventory, message: 'inventory with id: ' + inventory.id + ' updated successfully.' })
                    })
            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
    server.get('/checkItemQty/:item', (req, res) => {
        // console.log(req);

        Inventory
            .findOne({ where: { name: req.params.item } })
            .then(inventory => {
                // console.log(inventory);

                res.json({ success: true, qty: inventory.qty })
            })
            .catch((err) => {
                res.json({ success: false, err: err })

            })
    })
}
