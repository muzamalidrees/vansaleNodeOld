const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const roleSchema = { name: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Roles = sequelize.define('roles', roleSchema, configs);

Roles.sync()
    .then(() => { console.log('roles is ready') })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Roles