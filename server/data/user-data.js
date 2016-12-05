const validator = require('../utilities/validator')
module.exports = function (models) {
    let {User} = models;

    return {
        createUser(userToBeCreated) {
            let username = userToBeCreated.username,
                firstName = userToBeCreated.firstName,
                lastName = userToBeCreated.lastName,
                salt = userToBeCreated.salt,
                hashedPass = userToBeCreated.hashedPass;

            if (username.length < 4 || username.length > 10) {
                return Promise.reject({reason: 'username must be between 4 to 10 symbols'})
            }

            if (firstName.length < 3 || firstName.length > 10) {
                return Promise.reject({reason: 'First name must be between 3 to 10 symbols'})
            }
            if (username.length < 3 || username.length > 10) {
                return Promise.reject({reason: 'Last name must be between 3 to 10 symbols'})
            }

            if (!validator.validateSymbols(username)) {
                return Promise.reject({reason: 'username cannot contains invalid symbols'})
            }
            if (!validator.validateSymbols(lastName)) {
                return Promise.reject({reason: 'Last name cannot contains invalid symbols'})
            }
            if (!validator.validateSymbols(firstName)) {
                return Promise.reject({reason: 'First name cannot contains invalid symbols'})
            }

            var user = new User({
                username,
                firstName,
                lastName,
                salt,
                hashedPass,
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserById(userId) {
            return new Promise((resolve, reject) => {
                User.findById(userId, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.find({username: username}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user[0]);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                User.find((err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(users);
                });
            });
        },
        deleteUser(username) {
            return new Promise((resolve, reject) => {
                User.find({'username': username}).remove().exec();
                resolve();
            });
        },
        attachTripToUserAsDriver(tripId, username, from, to) {
            return new Promise((resolve, reject) => {
                User.update({'username': username},
                    {
                        $push: {
                            'tripsAsDriver': {
                                'tripId': tripId,
                                'from': from,
                                'to': to
                            }
                        }
                    },
                    {upsert: true},
                    function (err, user) {
                        if (err) console.log(err);
                    });
                resolve();
            })
        },
        attachTripToUserAsPassenger(tripId, username, from, to) {
            return new Promise((resolve, reject) => {
                User.update({'username': username},
                    {
                        $push: {
                            'tripsAsPassenger': {
                                'tripId': tripId,
                                'from': from,
                                'to': to
                            }
                        }
                    },
                    {upsert: true},
                    function (err, user) {
                        if (err) console.log(err);
                    });
                resolve();
            })
        },
        updateUserRating(userId, rating, giveUserId){
            let checkRating = +rating
            if (rating < 1 || rating > 10) {
                return Promise.reject({reason: 'invalid rating'})
            }
            return new Promise((resolve, reject) => {
                User.findByIdAndUpdate(userId, {$push: {ratings: {userId: giveUserId, rating}}}, {
                    safe: true,
                    upsert: true,
                    new: true
                }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    }
}