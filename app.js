var express = require('express')
var bodyparser = require('body-parser')
var server = express()


// server.use(express.static('./build'))
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())



require('./server/configs/db-config-mysql');
require('./server/configs/passport-config')(server);
require('./server/routes/route-login')(server);
require('./server/routes/route-users')(server);



server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
    // res.status(500).send("Error catched by error handler")        //to display our message
})

server.listen(process.env.PORT || 8000, () => console.log("server is running"))