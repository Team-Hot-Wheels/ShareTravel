const controllers = require('../../controllers');
const auth = require('../../config/auth');

module.exports = (app) => {
    app.get('/', controllers.trips.getAll);
    app.get('/about', controllers.home.about);

    app.get('/articles/create', auth.isInRole('Admin'), controllers.articles.create);

   
};