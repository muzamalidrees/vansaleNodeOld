const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const salesSchema = { customer_id: Sequelize.INTEGER, product_id: Sequelize.INTEGER, rate: Sequelize.INTEGER, qty: Sequelize.INTEGER, discount: Sequelize.INTEGER, price: Sequelize.INTEGER, invoice_id: Sequelize.INTEGER }
const configs = { paranoid: true, underscored: true, }
const Sales = sequelize.define('sales', salesSchema, configs);

Sales.sync()
    .then(() => {
        // console.log('Sales is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Sales 