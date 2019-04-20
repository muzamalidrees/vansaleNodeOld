var passport = require('passport');

module.exports = function (server) {


    server.post('/auth', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({ success: false, message: info.message });
                return
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                // if (user.role_id == 1) {
                // res.redirect('/home')
                res.send({ success: true, route: '/home', message: '' })

                // }
                // else {
                // res.redirect('/home/' + user.username)
                // }
            });
        })(req, res, next);
    });


    // server.get('/about/:name', isLoggedIn, function (req, res) {

    //     res.send({ success: 'logged in', route: '/about/' + req.user.username, message: '' })

    // });
    server.get('/isAuth', isLoggedIn, function (req, res) {

        res.send({ loggedIn: true, user: req.user })

    });
    function isLoggedIn(req, res, next) {

        // if user is authenticated, we'll all float on OK
        if (req.isAuthenticated()) {
            return next();
        }
        // otherwise, redirect them to the login page
        res.send({ loggedIn: false, user: req.user })
        // res.redirect('/login');
    }

    server.get('/logout', function (req, res) {

        req.logout();
        res.send({ success: true, route: '/login', user: req.user });

    })
}