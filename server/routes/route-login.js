var passport = require('passport');

module.exports = function (server) {


    server.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({ success: 'false', message: info.message });
                return
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                // if (user.role_id == 1) {
                res.redirect('/home')
                // }
                // else {
                // res.redirect('/home/' + user.username)
                // }
            });
        })(req, res, next);
    });

    server.get('/logout', function (req, res) {
        req.logout();
        res.send({ success: true, route: '/home', user: req.user });
    })

    // server.get('/about/:name', isLoggedIn, function (req, res) {

    //     res.send({ success: 'logged in', route: '/about/' + req.user.username, message: '' })

    // });
    server.get('/home', isLoggedIn, function (req, res) {

        res.send({ success: 'logged in', route: '/home', message: '', user: req.user })

    });
    function isLoggedIn(req, res, next) {

        // if user is authenticated, we'll all float on OK
        if (req.isAuthenticated()) {
            return next();
        }
        // otherwise, redirect them to the login page
        res.redirect('/login');
    }
    // server.get('/logout', function (req, res) {
    //     req.logout();
    //     res.redirect('/login');
    // });
    // server.get('/login', function(req, res){
    //     res.send({message:'ok'});
    // })

}