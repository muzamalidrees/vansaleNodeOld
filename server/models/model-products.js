const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const productSchema = { name: Sequelize.STRING, price: Sequelize.STRING, description: Sequelize.STRING, product_category_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Products = sequelize.define('products', productSchema, configs);

Products.sync()
    .then(() => {
        //  console.log('products is ready')
         })
    .catch((err) => {
        console.log('err')
        console.log(err)
    })
    ;

module.exports = Products