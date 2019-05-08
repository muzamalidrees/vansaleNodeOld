
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
                .then((user) => {
                    if (!user) {
                        next(null, false, { message: `email doesn't exist` })
                    }
                    else if (user.password !== password) {
                        next(null, false, { message: 'incorrect Password' })
                    }
                    else {
                        next(null, user)
                    }
                })
                .catch(err => next(err));
        }

    ));

    passport.serializeUser(function (user, next) {
        // console.log('serialize')
        next(null, user.id);
    })
    passport.deserializeUser(function (id, next) {
        // console.log('deserialize')
        Users.findById(id)
            .then((user) => {
                return next(null, user)
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
