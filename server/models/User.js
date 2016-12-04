const mongoose = require('mongoose');
const encryption = require('../utilities/encryption');

let requiredValidationMessage = '{PATH} is required';

let nestedRatingSchema = mongoose.Schema({
    userId: String,
    rating: {type: Number, min: 1, max: 10}
})
let userSchema = mongoose.Schema({
    username: {type: String, required: requiredValidationMessage, unique: true},
    firstName: {type: String, required: requiredValidationMessage},
    lastName: {type: String, required: requiredValidationMessage},
    ratings: [nestedRatingSchema],
    salt: String,
    hashedPass: String,
    roles: [String],
    tripsAsPassenger: [{}],
    tripsAsDriver: [{}]
});

userSchema.method({
    authenticate: function (password) {
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password);
        if (inputHashedPassword === this.hashedPass) {
            return true;
        } else {
            return false;
        }
    }
});

userSchema.method({
    isVotedAlready: function (userId) {
        let isAlreadyVoted = false;
        for (var item of this.ratings) {
            if (item.userId == userId) {
                isAlreadyVoted = true;
            }
        }

        return isAlreadyVoted;
    }
});

userSchema.method({
    calculateRating: function () {
        if (this.ratings.length == 0) {
            return 0;
        }
        else {
            let ratings = this.ratings.map(function (x) {
                return x.rating;
            });
            let sum = ratings.reduce(function (a, b) {

                return a + b;
            }, 0);
            let result = sum / ratings.length;
            result = result.toFixed(2);

            return result;
        }
    }
});

let User = mongoose.model('User', userSchema)

module.exports = mongoose.model('User', userSchema);

module.exports.seedAdminUser = () => {
    User.find({}).then(users => {
        if (users.length === 0) {
            let salt = encryption.generateSalt();
            let hashedPass = encryption.generateHashedPassword(salt, 'admin');

            User.create({
                username: 'admin',
                firstName: 'Admin',
                lastName: 'Adminov',
                salt: salt,
                hashedPass: hashedPass,
                roles: ['Admin']
            })
        }
    })
};