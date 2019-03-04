const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "abc",
    password: "abc123",
    database: "muzamalDB"
})
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    
});
module.exports = con;