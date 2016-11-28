let Trip = require('../data/Trip');
let moment = require('moment');

module.exports = {
    index: (req, res) => {
        res.render('trips/trips')
    },
    create: (req, res) => {
        let trip = req.body;

        Trip
            .create(trip)
            .then(
                () => {
                    res.redirect('/')
                })
    },
    getAll: (req, res) => {
        Trip.find((err, trips) => {
            res.render('home/index', {data: trips});
        })
    }
};