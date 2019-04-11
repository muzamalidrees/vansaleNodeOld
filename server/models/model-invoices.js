const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const invoiceSchema = { total: Sequelize.INTEGER, type: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Invoices = sequelize.define('invoices', invoiceSchema, configs);

Invoices.sync()
    .then(() => {
        // console.log('Invoices is ready')
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Invoices 