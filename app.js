var express = require('express')
var bodyparser = require('body-parser')
var users = [
    { id: 1, username: "abc@abc.com", password: 'abc123' },
    { id: 2, username: "xyz@xyz.com", password: 'xyz123' },
]

var server = express()

server.use(express.static('./frontend'))
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())

require('./server/configs/db-config-mysql');
require('./server/configs/passport-config')(server, users);
require('./server/routes/route-login')(server);
require('./server/models/model-users');
require('./server/routes/route-users')(server);



server.use((err, req, res, next) => {
    console.log(err)
    // res.status(500).send(err.message)
    res.status(500).send("Error catched by error handler")        //to display our message
})

server.listen(process.env.PORT || 8000, () => console.log("server is running"))