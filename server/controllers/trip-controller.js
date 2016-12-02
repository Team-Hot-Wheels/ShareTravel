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
            if (Date.parse(trip.date) <= Date.now()) {
                req.flash('error', 'you must enter a date in the future');
                return res.redirect('/trips/create');
            }
            data.createTrip(trip)
                .then(
                () => {
                    res.redirect('/')
                })
        },
        getPagedTrips(req, res) {
            const pageNumber = +req.query.pageNumber || 0,
                pageSize = +req.query.pageSize || 5;
            
           
            data.getAllTrips()
                .then((trips) => {
                   
                    
                          // negative page numbers don't make sense
            if(pageNumber < 0) {
                pageNumber = 0;
            }

            // don't allow negative pages
            if(pageSize < 0) {
                pageSize = 5;
            }

            // it's good practice to have an upped bound on page size, otherwise your endpoint might be exploited
            if(pageSize > 50) {
                pageSize = 50;
            }
            var pagedTrips = [];
            var totalPages = Math.ceil(trips.length/pageSize);
            console.log(pageNumber*pageSize +", " +pageNumber*pageSize+pageSize);

            pagedTrips = trips.slice(pageNumber*pageSize,pageNumber*pageSize+pageSize);
            
           
            
            var tripsForView = {pagedTrips,totalPages,pageNumber};
          
            res.render('trips/paged-trips', {data :tripsForView});
                    
                });
      
            // data.getPagedTrips(pageNumber, pageSize)
            //     .then((trips) => {
            //      console.log(trips);
            //         res.render('home/index', { data: {trips, totalPages });
            //     });
        },
        getLatestSixTrips(req, res) {
            data.getLatestSixTrips()
                .then((trips) => {
                    for (var i = 0; i < trips.length; i += 1) {
                        var newDate = new Date(trips[i].date);
                        trips[i].humanDate = moment(newDate).format("DD-MMM-YYYY (dddd)");
                    }

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
            let from = new RegExp('^' + req.body.from + '.*$', "i");
            let to = new RegExp('^' + req.body.to + '.*$', "i");

            var searchedParameters = { 'from': from, "to": to, "date": req.body.date };
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