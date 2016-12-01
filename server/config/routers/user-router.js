const auth = require('../../config/auth');
const express = require("express");

module.exports = (app, data) => {
    let controllers = require('../../controllers')(data);
    let router = new express.Router();

    router
            .get('/users/register', controllers.register)
            .post('/users/create', controllers.createUser)
            .get('/users/login', controllers.login)
            .post('/users/authenticate', controllers.authenticate)
            .post('/users/logout', controllers.logout)
            .get('/users/update-profile', controllers.editProfile)
            .post('/users/update-profile', controllers.updateProfile)
            .get('/users/:username', controllers.getByUsername)

        .all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end()
    });

    app.use("/", router);
};