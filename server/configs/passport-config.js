var session = require('express-session');
var passport = require('passport');
var con = require('../configs/db-config-mysql')
var localStrategy = require('passport-local').Strategy;

module.exports = function (server, users) {
    server.use(session({ secret: "secret-word" }));
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new localStrategy(

        function (username, password, next) {
            var sql = "SELECT username, password FROM users";
            var users; 
            con.query(sql, function (err, result, fields) {
                if (err) {
                    throw err
                }
                // console.log(result);
               return users = result;
            }
            );
            users.find({ username: username }, function (err, user) {
                if (err) { return next(err); }
                if (!user) { return next(null, false); }
                if (!user.verifyPassword(password)) { return next(null, false); }
                return next(null, user);
            });
        }
    ));
    // passport.use(new localStrategy(
    //     function (username, password, next) {
    //         var user = users.find((user) => {
    //             return user.username === username && user.password === password;
    //         })
    //         if (user) {
    //             next(null, user);
    //         }
    //         else {
    //             next(null, false);
    //         }
    //     }
    // ));
    passport.serializeUser(function (user, next) {
        next(null, user.id);
    })
    passport.deserializeUser(function (id, next) {
        var user = users.find((user) => {
            return user.id === id;
        })
        next(null, user);
    });
}