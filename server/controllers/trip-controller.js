let Trip = require('../models/Trip');
let moment = require('moment');

module.exports = function (data) {
    return {
        indexTrip(req, res){
            res.render('trips/trips')
        },
        createTrip(req, res){
            let trip = req.body;

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
                    res.render('home/index', {data: trips});
                });
        }
    };
};