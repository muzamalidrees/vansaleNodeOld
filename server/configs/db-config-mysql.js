const Sequelize = require('sequelize');


var dbName = 'muzamaldb';
var user = 'vansale';
var password = 'vansale1234';
var config = {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    omitNull: true,
    pool: {
        max: 100,
        min: 0,
        acquire: 1000000,
        idle: 200000
    }
}

// const sequelize = new Sequelize(dbName, user, password, config)
// var sequelize = new Sequelize('mysql://51.75.74.185:3306/vansale', 'vansaledbusr', '7WPz!39vmnzK', [options = config])
var sequelize = new Sequelize('mysql://vansaledbusr:7WPz!39vmnzK@51.75.74.185:3306/vansale',[config]);
// 
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


module.exports = sequelize











// const mysql = require('mysql');
//                                               for lapi
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "abc",
//     password: "abc123",
//     database: "muzamalDB"
// })
//                                               for office pc
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "vansale",
//     password: "bkt1234",
//     database: "van_sale"
// })
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");

// });
// module.exports = con;
