const controllers = require('../../controllers');
const auth = require('../../config/auth');

module.exports = (app) => {
   
    app.get('/trips', controllers.trips.index);
    app.post('/trips/create', controllers.trips.create);
 
};