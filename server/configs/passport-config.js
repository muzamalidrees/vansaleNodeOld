
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var Users = require('../models/model-users')
// var sequelize = require('./db-config-mysql')
// var SequelizeStore = require('connect-session-sequelize')(session.Store);


module.exports = function (server) {
    server.use(session({
        secret: 'secret-word',
        // store: new SequelizeStore({
        // db: sequelize
        // }),

    }))
    server.use(passport.initialize());
    server.use(passport.session());

    passport.use(new localStrategy(
        function (username, password, next) {
            Users.findOne({ where: { email: username } })
                .then((users) => {
                    if (!users) {
                        next(null, false, { message: 'email doesnt exist' })
                    }
                    else if (users.password !== password) {
                        next(null, false, { message: 'incorrect Password' })
                    }
                    else {
                        next(null, users)
                    }
                })
                .catch(err => next(err));
        }

    ));

    passport.serializeUser(function (users, next) {
        console.log('serialize')
        next(null, users.id);
    })
    passport.deserializeUser(function (id, next) {
        console.log('deserialize')
        Users.findById(id)
            .then((users) => {
                return next(null, users)
            });
    })
}











    // var con = require('../configs/db-config-mysql')
    // var session = require('express-session')
// var passport = require('passport')
// var localStrategy = require('passport-local').Strategy


// module.exports = function (server, users) {
//     server.use(session({ secret: "secret-word" }));
//     server.use(passport.initialize());
//     server.use(passport.session());


//     passport.use(new localStrategy(
//         function (username, password, next, err) {
//             if (err)
//                 throw err
//             else {
//                 var user = users.find((user) => {
//                     return user.username === username && user.password === password;
//                 })
//                 if (user) {
//                     next(null, user);
//                 }
//                 else {
//                     next(null, false);
//                 }
//             }
//         }
//     ));
//     passport.serializeUser(function (user, next) {
//         next(null, user.id);
//     })
//     passport.deserializeUser(function (id, next) {
//         var user = users.find((user) => {
//             return user.id === id;
//         })
//         next(null, user);
//     });
// }
