const auth = require('../../config/auth');
const express = require("express");

module.exports = (app, data) => {
    let controllers = require('../../controllers')(data);
    let router = new express.Router();

    router
        .post('/trips/join-trip', controllers.joinTrip)
        .post('/trips/search-trips', controllers.findTrips)
        .get('/trips/search', controllers.findTripsIndex)
        .get('/trips/create', controllers.createTripIndex)
        .post('/trips/create', controllers.createTrip)
        .get('/trips/:id', controllers.getTripById)
        .get('/trips/error', controllers.errorTrip)
        .get('/trips', controllers.getPagedTrips);

    app.use("/", router);
};