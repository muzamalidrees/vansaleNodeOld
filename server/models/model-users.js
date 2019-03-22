const Sequelize = require('sequelize');
var sequelize = require('../configs/db-config-mysql');


var userSchema = {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    cell: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }}
    const Users = sequelize.define('users', userSchema);


// force: true will drop the table if it already exists
// Users.sync({ force: true })
//     .then(() => {
//         // Table created
//         console.log('Table created');
//     })
//     .catch(err => {
//         console.error('unable to create table:', err);
//     });

module.exports = Users