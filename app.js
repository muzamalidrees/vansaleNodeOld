var express = require('express')
var bodyparser = require('body-parser')
var server = express()


// server.use(express.static('./build'))
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())



require('./server/configs/db-config-mysql');
require('./server/configs/passport-config')(server);
require('./server/routes/route-login')(server);
require('./server/models/model-users');
require('./server/routes/route-users')(server);
require('./server/routes/route-customers')(server);
require('./server/routes/route-priceGroups')(server);
require('./server/routes/route-customerPricing')(server);
require('./server/routes/route-drivers')(server);
require('./server/routes/route-routes')(server);
require('./server/routes/route-products')(server);
require('./server/routes/route-productCategories')(server);
require('./server/routes/route-areas')(server);
require('./server/routes/route-roles')(server);
require('./server/routes/route-permissions')(server);
require('./server/routes/route-RP')(server);
require('./server/routes/route-invoices')(server);
require('./server/routes/route-returns')(server);
require('./server/routes/route-sales')(server);



server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
    // res.status(500).send("Error catched by error handler")        //to display our message
})

server.listen(process.env.PORT || 8000, () => console.log("server is running"))