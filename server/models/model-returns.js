const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const returnsSchema = { customer_id: Sequelize.INTEGER, product_id: Sequelize.INTEGER, rate: Sequelize.INTEGER, qty: Sequelize.INTEGER, discount: Sequelize.INTEGER, price: Sequelize.INTEGER, invoice_id: Sequelize.INTEGER }
const configs = { paranoid: true, underscored: true, }
const Returns = sequelize.define('returns', returnsSchema, configs);

Returns.sync()
    .then(() => {
        console.log('returns is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Returns 