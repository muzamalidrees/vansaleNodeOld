var session = require('express-session')
var passport = require('passport')
var localStrategy = require('passport-local').Strategy


module.exports = function (server, users) {
    server.use(session({ secret: "secret-word" }));
    server.use(passport.initialize());
    server.use(passport.session());


    passport.use(new localStrategy(
        function (username, password, next) {
            var user = users.find((user) => {
                return user.username === username && user.password === password;
            })
            if (user) {
                next(null, user);
            }
            else {
                next(null, false);
            }
        }
    ));
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


// var session = require('express-session');
// var passport = require('passport');
// // var sequelize = require('./db-config-mysql')
// var Users = require('../models/model-users')
// var localStrategy = require('passport-local').Strategy;
// // var SequelizeStore = require('connect-session-sequelize')(session.Store);


// module.exports = function (server) {
//     server.use(session({
//         secret: 'secret-word',
//         // store: new SequelizeStore({
//         //     db: sequelize
//         // }),

//     }))
//     server.use(passport.initialize());
//     server.use(passport.session());

//     console.log("passport is working");
//     passport.serializeUser(function (users, done) {
//         return done(null, users.id);
//         console.log("Serialize");

//     })

//     passport.deserializeUser(function (id, done) {
//         console.log("DeSerialize");
//         Users.findById(id).then((users) => {
//             console.log(users);
//             return done(null, users);
//         });
//     })


//     passport.use(new localStrategy(
//         function (username, password, done) {
//             Users.findOne({ where: { username: username } })
//                 .then((users) => {
//                     if (!users) {
//                         return done(null, false, { message: 'Incorrect username.' });
//                     }
//                     if (!users.password === password) {
//                         return done(null, false, { message: 'Incorrect password.' });
//                     }
//                     return done(null, users);
//                 })
//                 .catch(err => done(err));
//         }

//     ));

    // passport.serializeUser(function (user, next) {
    //     next(null, user.id);
    // })
    // passport.deserializeUser(function (id, next) {
    //     Users.findById(id)
    //         .then((users) => {
    //             return next(null, users)
    //         });
    // })
// }
    // var con = require('../configs/db-config-mysql')