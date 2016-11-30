const auth = require('../../config/auth');
const express = require("express");

module.exports = (app, data) => {
    const controllers = require('../../controllers')(data);
    let router = new express.Router();
    router
        .get('/', controllers.getAllTrips)
        .get('/about', controllers.about)
        .get('/articles/create', auth.isInRole('Admin'), controllers.createArticle);

    app.use("/", router);
};