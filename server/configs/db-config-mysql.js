const Sequelize = require('sequelize');
const sequelize = new Sequelize('muzamalDB', 'abc', 'abc1234', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

});
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize


































//                  without sequelize
// const mysql = require('mysql');
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "abc",
//     password: "abc1234",
//     database: "muzamalDB"
// })
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");

// });
// module.exports = con;




//               query function to create database
// con.query("CREATE DATABASE muzamalDB", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");
    // });

//              query to create a table with primary key
    // var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255), address VARCHAR(255), username VARCHAR(255), passowrd VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    // });