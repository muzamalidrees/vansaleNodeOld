const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const permissionSchema = { name: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Permissions = sequelize.define('permissions', permissionSchema, configs);

Permissions.sync()
    .then(() => { 
        // console.log('permissions is ready') 
    })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Permissions