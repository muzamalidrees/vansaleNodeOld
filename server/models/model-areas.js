const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const areaSchema = { name: Sequelize.STRING, area_code: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Areas = sequelize.define('areas', areaSchema, configs);

Areas.sync()
    .then(() => { 
        // console.log('areas is ready')
     })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Areas 