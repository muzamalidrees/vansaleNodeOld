const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const CPSchema = { customer_id: Sequelize.STRING, price_group_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const CustomerPricing = sequelize.define('customer_pricing', CPSchema, configs);

CustomerPricing.sync()
    .then(() => { 
        // console.log('customer-pricing is ready') 
})
    .catch((err) => {
        console.log(err)
    })
    ;



module.exports = CustomerPricing 