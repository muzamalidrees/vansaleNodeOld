var passport = require('passport');


module.exports = function (server) {
    server.post('/login', passport.authenticate('local'), function (req, res) {
        res.redirect('/ohome')
    });

    server.get('/ohome', function (req, res) {

        if (!req.isAuthenticated()) {
            res.send("login required to visit this page")
        }
        else {
            res.send('logged in')
        }

    });
}