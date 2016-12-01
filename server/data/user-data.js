module.exports = function (models) {
    let {User} = models;

    return {
        createUser(userToBeCreated) {
            let username = userToBeCreated.username,
                firstName = userToBeCreated.firstName,
                lastName = userToBeCreated.lastName,
                salt = userToBeCreated.salt,
                hashedPass = userToBeCreated.hashedPass;

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
                User.find({ username: username }, (err, user) => {
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
                User.find({ 'username': username }).remove().exec();
            });
        }
    }
}