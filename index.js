const express = require('express');


let app = express();

let env = process.env.NODE_ENV || 'development';
let config = require('./server/config/config')[env];


require('./server/config/database')(config);
let User = require('./server/models/User');
let Trip = require('./server/models/Trip');
let data = require('./server/data')({User, Trip});
require('./server/config/express')(config, app);
require('./server/config/routers')(app, data);
require('./server/config/passport')();
let data2 = require("./server/data/user-data");

app.listen(config.port);
console.log('Express ready!');
