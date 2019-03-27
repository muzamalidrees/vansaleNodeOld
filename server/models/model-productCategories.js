const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const PCSchema = { name: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const ProductCategories = sequelize.define('product_categories', PCSchema, configs);

ProductCategories.sync()
    .then(() => { 
        // console.log('product-categories is ready')
     })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = ProductCategories 