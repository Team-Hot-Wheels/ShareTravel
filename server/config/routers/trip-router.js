const auth = require('../../config/auth');
const express = require("express");

module.exports = (app, data) => {
    let controllers = require('../../controllers')(data);
    let router = new express.Router();

    router
        .get('/trips', controllers.indexTrip)
        .post('/trips/create', controllers.createTrip);

    app.use("/", router);
};