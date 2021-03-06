var Areas = require('../models/model-areas')
var Customers = require('../models/model-customers')
var Drivers = require('../models/model-drivers')
var Inventory = require('../models/model-inventory')
var Permissions = require('../models/model-permissions')
var ProductCategories = require('../models/model-productCategories')
var Products = require('../models/model-products')
var Roles = require('../models/model-roles')
var Routes = require('../models/model-routes')
var Users = require('../models/model-users')
var formidable = require('formidable');
var XLSX = require('xlsx')
var savedResults = [];
var failedResults = [];
var entity;


module.exports = function (server) {

    server.post('/import', (req, res) => {

        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            let data;
            let rows = []
            let f = files[Object.keys(files)[0]];
            let workbook = XLSX.readFile(f.path);
            let filename = f.name;
            let ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

            if (ext === 'xlsx') {
                var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                // console.log(data[0]);
                if (validateComingData(data[0], fields)) {

                    for (i = 1; i < data.length; i++) {
                        let array2 = data[i];

                        if (array2[1] !== undefined) {
                            rows.push(rowToBeSave(array2, fields.importing))
                        }
                    }
                }
                else {
                    res.send({ success: false, message: 'You are uploading wrong data for selected data type.please upload according to sample file' })
                    return;
                }

                var promises = [];

                rows.forEach(row => {
                    if (row !== null) {
                        let findCondition = conditionToBeChecked(row, fields.importing);

                        promises.push(
                            entity
                                .findOrCreate({ where: findCondition, defaults: row })
                                .then(([result, created]) => {
                                    if (created) {
                                        let sRow = result.get({ plain: true });
                                        savedResults.push(sRow)
                                    }
                                    if (!created) {
                                        let fRow = row
                                        failedResults.push(fRow)
                                    }
                                })
                                .catch((err) => {
                                    console.log(err)
                                    res.json({ success: false, err: err, message: 'something went wrong' })
                                })
                        )
                    }
                });
                Promise.all(promises)
                    .then(() =>
                        res.json({ success: savedResults, failure: failedResults, message: '' })
                    )
                    .then(() => {
                        savedResults = [], failedResults = [];
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
            else {
                res.send({ success: false, message: 'you can upload only Excel files' })
            }

        });
    });
}


rowToBeSave = (array2, fields) => {

    switch (fields) {
        case "AREAS":
            entity = Areas;
            let area = { name: array2[1] }
            return area
        case "CUSTOMERS":
            entity = Customers;
            let customer = { name: array2[1], email: array2[2], cell: array2[3], address: array2[4] }
            return customer
        case "DRIVERS":
            entity = Drivers;
            let driver = { name: array2[1], email: array2[2], cell: array2[3], address: array2[4] }
            return driver
        case "INVENTORY":
            entity = Inventory;
            let inventory = { name: array2[1], description: array2[2], rate: array2[3], qty: array2[4], price: array2[5], }
            return inventory
        case "PERMISSIONS":
            entity = Permissions;
            let permission = { name: array2[1] }
            return permission
        case "PRODUCTcATEGORIES":
            entity = ProductCategories;
            let productCategory = { name: array2[1] }
            return productCategory
        case "PRODUCTS":
            entity = Products;
            let product = { name: array2[1], price: array2[2], description: array2[3] }
            return product
        case "ROLES":
            entity = Roles;
            let role = { name: array2[1] }
            return role
        case "ROUTES":
            entity = Routes;
            let route = { name: array2[1], description: array2[2] }
            return route
        case "USERS":
            entity = Users;
            let user = { name: array2[1], email: array2[2], cell: array2[3], address: array2[4], username: array2[5], password: array2[6] }
            return user
    }
}
conditionToBeChecked = (row, fields) => {
    if (
        fields === 'AREAS' ||
        fields === 'PERMISSIONS' ||
        fields === 'PRODUCTcATEGORIES' ||
        fields === 'PRODUCTS' ||
        fields === 'ROLES' ||
        fields === 'INVENTORY' ||
        fields === 'ROUTES'
    ) {
        return { name: row.name }
    }
    else if (
        fields === 'CUSTOMERS' ||
        fields === 'DRIVERS' ||
        fields === 'USERS'
    ) {
        return { email: row.email }
    }
}
validateComingData = (comingRow, fields) => {
    let ourRow;
    switch (fields.importing) {
        case 'CUSTOMERS':
        case 'DRIVERS':
            ourRow = ['Sr.', 'name', 'email', 'cell', 'address']
            console.log(ourRow)
            break;
        case 'AREAS':
        case 'PERMISSIONS':
        case 'PRODUCTcATEGORIES':
        case 'ROLES':
            ourRow = ['Sr.', 'name']
            console.log(ourRow)

            break;
        case 'INVENTORY':
            ourRow = ['Sr.', 'name', 'description', 'rate', 'qty', 'price']
            console.log(ourRow)
            break;
        case 'PRODUCTS':
            ourRow = ['Sr.', 'name', 'price', 'description']
            console.log(ourRow)
            break;
        case 'ROUTES':
            ourRow = ['Sr.', 'name', 'description']
            console.log(ourRow)
            break;
        case 'USERS':
            ourRow = ['Sr.', 'name', 'email', 'cell', 'address', 'username', 'password']
            console.log(ourRow)
            break;
    }

    if (JSON.stringify(comingRow) === JSON.stringify(ourRow)) {
        return true
    }
    else return false
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