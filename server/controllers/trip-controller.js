let Trip = require('../models/Trip');
let moment = require('moment');

module.exports = function (data) {
    return {
        createTripIndex(req, res) {
            res.render('trips/create-trip')
        },
        createTrip(req, res) {
            let trip = req.body;
            trip.username = req.user.username;
            data.createTrip(trip)
                .then(
                () => {
                    res.redirect('/')
                })
        },
        getAllTrips(req, res) {
            data.getAllTrips()
                .then((trips) => {
                    console.log(trips);
                    res.render('home/index', { data: trips });
                });
        },
        errorTrip(req, res) {
            res.render('/trips/error');
        },
        getTripById(req, res) {
            var tripId = req.params.id;
            data.getTripById(tripId)
                .then(trip => {
                    if (trip === null) {
                        return res.status(404)
                            .redirect("trips/error");
                    }
                    return res.render("trips/trip-details", {
                        data: trip
                    });
                });
        },
        findTripsIndex(req, res) {
            res.render('trips/search-trips');
        },
        findTrips(req, res) {
            console.log(req.body);
            var searchedParameters = { 'from': req.body.from, "to": req.body.to, "date": req.body.date };
            // for more flexible search if user doesn't fill in all fields they are removed from search object passed to db
            if (req.body.from.length === 0) {
                delete searchedParameters["from"];
            }

            if (req.body.to.length === 0) {
                delete searchedParameters["to"];
            }

            if (req.body.date.length === 0) {
                delete searchedParameters["date"];
            }

            data.findTrips(searchedParameters)
                .then(tripCollection => {
                    if (tripCollection === null) {
                        return res.status(404)
                            .redirect('trips/error');
                    }
                    res.render('trips/search-trips', {
                        data: tripCollection
                    });
                });
        }
    };
};