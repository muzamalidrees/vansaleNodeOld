const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const driverSchema = { name: Sequelize.STRING, email: Sequelize.STRING, cell: Sequelize.STRING, address: Sequelize.STRING, area_id: Sequelize.STRING, route_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Drivers = sequelize.define('drivers', driverSchema, configs);

Drivers.sync()
    .then(() => { console.log('drivers is ready') })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Drivers