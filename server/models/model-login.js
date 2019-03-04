
var con = require('../configs/db-config-mysql')





    var sql = "SELECT username, password FROM users";
   var users =  (con.query(sql, function (err, result, fields) {
        if (err) {
            throw err
        }
        // console.log(result);
        return result;
    }
    ));

module.exports = users

// var users = [
//     { id: 1, username: "abc@abc.com", password: 'abc123' },
//     { id: 2, username: "xyz@xyz.com", password: 'xyz123' },
// ]
