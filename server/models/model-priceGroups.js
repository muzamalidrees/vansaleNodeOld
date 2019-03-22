const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const PGSchema = { name: Sequelize.STRING, product_category_id: Sequelize.STRING, price: Sequelize.STRING, buying_back_price: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const PriceGroups = sequelize.define('price_groups', PGSchema, configs);

PriceGroups.sync()
    .then(() => { console.log('pricegroups is ready') })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = PriceGroups 