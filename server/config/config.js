const path = require('path');

let rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/TravelShareDb',
        // db: 'mongodb://admin:admin@ds119718.mlab.com:19718/travelsharedb',
        port: 1337
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:admin@ds119718.mlab.com:19718/travelsharedb',
        port: process.env.port
    }
};
