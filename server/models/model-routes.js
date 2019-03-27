const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const routeSchema = { name: Sequelize.STRING, description: Sequelize.STRING, area_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Routes = sequelize.define('routes', routeSchema, configs);

Routes.sync()
    .then(() => {
        //  console.log('routes is ready')
         })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Routes