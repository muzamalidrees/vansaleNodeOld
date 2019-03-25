const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const RPSchema = { role_id: Sequelize.STRING, permission_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const RP = sequelize.define('roles_permissions', RPSchema, configs);

RP.sync()
    .then(() => { console.log('RP is ready') })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = RP