const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const inventorySchema = { name: Sequelize.STRING, description: Sequelize.STRING, rate: Sequelize.FLOAT, qty: Sequelize.FLOAT, price: Sequelize.FLOAT, }
const configs = { paranoid: true, underscored: true, }
const Inventory = sequelize.define('inventory', inventorySchema, configs);

Inventory.sync()
    .then(() => {
        // console.log('inventory is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Inventory 