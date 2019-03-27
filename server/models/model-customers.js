const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const customerSchema = { name: Sequelize.STRING, email: Sequelize.STRING, cell: Sequelize.STRING, address: Sequelize.STRING, area_id: Sequelize.STRING, route_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Customers = sequelize.define('customers', customerSchema, configs);

Customers.sync()
    .then(() => {
        //  console.log('customers is ready')
         })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Customers