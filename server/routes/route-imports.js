var Areas = require('../models/model-areas')
var CPs = require('../models/model-customerPricing')
var Customers = require('../models/model-customers')
var Drivers = require('../models/model-drivers')
var Permissions = require('../models/model-permissions')
var PriceGroups = require('../models/model-priceGroups')
var ProductCategories = require('../models/model-productCategories')
var Products = require('../models/model-products')
var Roles = require('../models/model-roles')
var Routes = require('../models/model-routes')
var RPs = require('../models/model-RP')
var Users = require('../models/model-users')
var formidable = require('formidable');
var XLSX = require('xlsx')
var savedResults = [];
var failedResults = [];


module.exports = function (server) {

    server.post('/import', (req, res) => {
        switch (req.body.importing) {
            case "AREAS":
                toBeSave = toSave.area;
                entity = Areas;
                findCondition = toSave.areaCondition
            case "CPs":
                toBeSave = toSave.cp;
                entity = CPs;
                findCondition = toSave.cpCondition
            case "CUSTOMERS":
                toBeSave = toSave.customer;
                entity = Customers;
                findCondition = toSave.customerCondition
            case "DRIVERS":
                toBeSave = toSave.driver;
                entity = Drivers;
                findCondition = toSave.driverCondition
            case "PERMISSIONS":
                toBeSave = toSave.permission;
                entity = Permissions;
                findCondition = toSave.permissionCondition
            case "PRICEgROUPS":
                toBeSave = toSave.priceGroup;
                entity = PriceGroups;
                findCondition = toSave.pgCondition
            case "PRODUCTcATEGORIES":
                toBeSave = toSave.productCategory;
                entity = ProductCategories;
                findCondition = toSave.pcCondition
            case "PRODUCTS":
                toBeSave = toSave.product;
                entity = Products;
                findCondition = toSave.productCondition
            case "ROLES":
                toBeSave = toSave.role;
                entity = Roles;
                findCondition = toSave.roleCondition
            case "ROUTES":
                toBeSave = toSave.route;
                entity = Routes;
                findCondition = toSave.routeCondition
            case "RPs":
                toBeSave = toSave.rp;
                entity = RPs;
                findCondition = toSave.rpCondition
            case "USERS":
                toBeSave = toSave.user;
                entity = Users;
                findCondition = toSave.userCondition
        }
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var data;
            var rows = []
            var f = files[Object.keys(files)[0]];
            var workbook = XLSX.readFile(f.path);
            var filename = f.name;
            var ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
            // console.log(ext);
            if (ext === 'xlsx') {
                var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                // console.log(data);
                const toSave = {
                    area: {},
                    areaCondition: {},
                    cp: {},
                    cpCondition: {},
                    customer: { name: array2[1], email: array2[2], cell: array2[3], address: array2[4] },
                    customerCondition: { email: req.body.email },
                    driver: {},
                    driverCondition: {},
                    permission: {},
                    permissionCondition: {},
                    priceGroup: {},
                    pgCondition: {},
                    productCategory: {},
                    pcCondition: {},
                    product: {},
                    productCondition: {},
                    role: {},
                    roleCondition: {},
                    route: {},
                    routeCondition: {},
                    rp: {},
                    rpCondition: {},
                    user: {},
                    userCondition: {},
                }
                var toBeSave;
                var entity;
                var findCondition;
                for (i = 1; i < data.length; i++) {
                    let array2 = data[i];
                    rows.push(toBeSave)
                }
                console.log(rows);
                var promises = [];
                rows.forEach(row => {
                    promises.push(
                        entity
                            .findOrCreate({ where: findCondition, defaults: row })
                            .then(([row, created]) => {
                                if (created) {
                                    let sRow = row.get({ plain: true });
                                    savedResults.push(sRow)
                                }
                                if (!created) {
                                    let fRow = row.get({ plain: true });
                                    failedResults.push(fRow)
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                                res.json({ success: false, err: err, message: 'something went wrong' })
                            })
                    )
                });
                Promise.all(promises)
                    .then(() =>
                        res.json({ success: savedResults, failure: failedResults })
                    )
                    .then(() => {
                        savedResults = [], failedResults = [];
                    })
            }
            else {
                res.send({ success: false })
            }

        });
    });
}



// Customers.bulkCreate(rows)
//     .then((rows) => {
//         res.send({ success: true, data: rows })
//         res.send('ok')
//         res.send('ok')
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({ success: false, data: err })
//     })