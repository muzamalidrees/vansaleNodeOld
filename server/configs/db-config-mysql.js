const mysql = require('mysql');
// for lapi
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "abc",
//     password: "abc123",
//     database: "muzamalDB"
// })
// for office pc
var con = mysql.createConnection({
    host: "localhost",
    user: "vansale",
    password: "bkt1234",
    database: "van_sale"
})
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    
});
module.exports = con;