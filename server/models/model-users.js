const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql')

const userSchema = { name: Sequelize.STRING, email: Sequelize.STRING, cell: Sequelize.STRING, address: Sequelize.STRING, username: Sequelize.STRING, password: Sequelize.STRING, role_id: Sequelize.STRING }
const configs = { paranoid: true, underscored: true, }
const Users = sequelize.define('users', userSchema, configs);

Users.sync()
    .then(() => {
        //  console.log('users is ready') 
        })
    .catch((err) => {
        console.log(err)
    })
    ;

module.exports = Users