const controllers = require('../controllers');
const auth = require('../config/auth');

module.exports = (app) => {
    app.get('/', controllers.trips.getAll);
    app.get('/about', controllers.home.about);
    app.get('/trips', controllers.trips.index);

    app.post('/trips/create', controllers.trips.create);
    app.get('/users/register', controllers.users.register);
    app.post('/users/create', controllers.users.create);
    app.get('/users/login', controllers.users.login);
    app.post('/users/authenticate', controllers.users.authenticate);
    app.post('/users/logout', controllers.users.logout);

    app.get('/articles/create', auth.isInRole('Admin'), controllers.articles.create);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end()
    })
};
