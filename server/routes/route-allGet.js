const path = require('path');

module.exports = function (server) {

    server.get('/', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/login', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/home', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/contact', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/about', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/stats', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/*/home', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/*/add', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/*/import', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/*/export', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/priceGroups/customerPricing', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
    server.get('/rolesAndPermissions/set', function (req, res) {

        res.sendFile(path.join(__dirname, '../../build', '../build/index.html'));
    });
}
