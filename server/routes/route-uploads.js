var Customers = require('../models/model-customers')
var formidable = require('formidable');
var XLSX = require('xlsx')
var savedCustomers = [];
var failedCustomers = [];

module.exports = function (server) {

    server.post('/upload', (req, res) => {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var data;
            var customers = []
            var f = files[Object.keys(files)[0]];
            var workbook = XLSX.readFile(f.path);
            var filename = f.name;
            var ext = filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
            // console.log(ext);
            if (ext === 'xlsx') {
                var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                // console.log(data);
                for (i = 1; i < data.length; i++) {
                    let array2 = data[i];
                    customers.push({ name: array2[1], email: array2[2], cell: array2[3], address: array2[4] })
                }

                for (j = 0; j < customers.length; j++) {
                    let cstmr = customers[j]
                    Customers.findOne({ where: { email: cstmr.email } })
                        .then(customer => {
                            let fcustomer = customer.get({ plain: true })
                            failedCustomers.push(fcustomer)
                        })
                        .catch(err => {
                            console.log(err)
                            savedCustomers.push(customer)
                        })
                }
                var ok = savedCustomers;
                var notok = failedCustomers;
                console.log(savedCustomers);
                console.log(failedCustomers);
                console.log(ok);
                console.log(notok);
                // customers.forEach(customer => {

                // })
            }
            else {
                res.send({ success: false })
            }
            res.send({ success: ok, failure: notok })

        });
        // console.log(savedCustomers);
        // console.log(failedCustomers);
        // console.log(customers);
    });
}




// customers.forEach(customer => {
//     Customers
//         .findOrCreate({ where: { email: customer.email }, defaults: customer })
//         .then(([customer, created]) => {
//             if (created) {
//                 let scustomer = customer.get({ plain: true });
//                 savedCustomers.push(scustomer)
//                 // console.log('ok');
//                 // res.json({ success: true, data: customer, message: 'customer registered successfully' })
//             }
//             if (!created) {
//                 let fcustomer = customer.get({ plain: true });
//                 failedCustomers.push(fcustomer)
//                 // console.log('fail')
//                 // res.json({ success: false, message: 'customer already exists' })
//             }
//         })
//         .catch((err) => {
//             // console.log(err)
//             res.json({ success: false, err: err, message: 'something went wrong' })

//         })
// });




















// Customers.bulkCreate(customers)
//     .then((customers) => {
//         res.send({ success: true, data: customers })
//         res.send('ok')
//         res.send('ok')
//     })
//     .catch((err) => {
//         console.log(err);
//         res.send({ success: false, data: err })
//     })