const validator = require('../utilities/validator')

module.exports = function (models) {
    let {Trip} = models;

    return {
        createTrip(tripToBeCreated) {

            let username = tripToBeCreated.username,
                from = tripToBeCreated.from,
                to = tripToBeCreated.to,
                date = tripToBeCreated.date,
                price = tripToBeCreated.price,
                slots = tripToBeCreated.slots,
                passengers = [];
            
            let priceToValidate = +price;
            let slotsToValidate = +slots;

            if(validator.isNumber(priceToValidate) && priceToValidate<0){
                 return Promise.reject({reason: 'Price cannot be negative number'})
            }
            if(validator.isNumber(slotsToValidate)  && slotsToValidate<1){
                 return Promise.reject({reason: 'slots cannot be negative number or 0'})
            }

            if (!validator.validateSymbols(from)) {
                return Promise.reject({reason: 'from cannot contains invalid symbols'})
            }
            if (!validator.validateSymbols(to)) {
                return Promise.reject({reason: 'to cannot contains invalid symbols'})
            }
            if (!validator.validateSymbols(date)) {
                return Promise.reject({reason: 'date cannot contains invalid symbols'})
            }
            if (!validator.validateSymbols(price)) {
                return Promise.reject({reason: 'price cannot contains invalid symbols'})
            }
            if (!validator.validateSymbols(slots)) {
                return Promise.reject({reason: 'slot cannot contains invalid symbols'})
            }
            var trip = new Trip({
                username,
                from,
                to,
                date,
                price,
                slots,
                passengers
            });

            return new Promise((resolve, reject) => {
                trip.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(trip);
                });
            });
        },
        getTripById(tripId) {
            return new Promise((resolve, reject) => {
                Trip.findById(tripId, (err, trip) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(trip)
                });
            });
        },
        getPagedTrips(pageNumber, pageSize) {
            return new Promise((resolve, reject) => {
                Trip.find({}).skip(pageNumber * pageSize).limit(pageSize).exec((err, trips) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(trips);
                });
            });
        },
        getAllTrips() {
            return new Promise((resolve, reject) => {
                Trip.find((err, trips) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(trips);
                });
            });
        },
        getLatestSixTrips() {
            return new Promise((resolve, reject) => {
                Trip.find({}).sort('date').limit(6).exec((err, trips) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(trips);
                });
            });
        },
        findTrips(searchedParameters) {
            return new Promise((resolve, reject) => {
                Trip.find(searchedParameters, (err, trips) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve(trips)
                })
            })
        },
        deleteTrip(tripId) {
            return new Promise((resolve, reject) => {
                Trip.find({'_id': tripId}).remove().exec();
                resolve();
            });
        },
        saveUserToSpecificTrip(usernameToBeAdded, tripId) {
            // single responsibility is broken -> method does two things 
            // 1. join a user to specific trip
            // 2. decrement free slots in order to provide accurate info to app users
            return new Promise((resolve, reeject) => {
                Trip.update({'_id': tripId},
                    {$push: {'passengers': usernameToBeAdded}, $inc: {'slots': -1}},
                    {upsert: true},
                    function (err, trip) {
                        if (err) console.log(err);
                    });

                resolve();
            })
        }
    }
}