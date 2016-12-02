let encryption = require('../utilities/encryption');
let User = require('mongoose').model('User');
const auth = require('../config/auth');

module.exports = function (data) {
    return {
        register(req, res) {
            res.render('users/register')
        },
        createUser(req, res) {
            let user = req.body;
            if (user.password !== user.confirmPassword) {
                user.globalError = 'Passwords do not match!';
                res.render('users/register', user)
            } else {
                user.salt = encryption.generateSalt();
                user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);

                data.createUser(user)
                    .then(user => {
                        if (req.user && req.user.roles[0] === 'Admin') {
                            req.flash('success', 'User created successfully');
                            return res.redirect('/admin/admin-add-user');
                        }
                        else {
                            req.logIn(user, (err, user) => {
                                if (err) {
                                    res.render('users/register', { globalError: 'Ooops 500' });
                                    return;
                                }
                                res.redirect('/')
                            })
                        }
                    })
            }
        },
        login(req, res) {
            res.render('users/login')
        },
        authenticate(req, res) {
            let inputUser = req.body;

            data.findUserByUsername(inputUser.username)
                .then((user) => {
                    if (!user) {
                        req.flash('error', 'Username not found!');
                        res.render('users/login')
                    }
                    if (!user.authenticate(inputUser.password)) {
                        req.flash('error', 'Invalid username or password')
                        res.render('users/login')
                    } else {
                        req.logIn(user, (err, user) => {
                            if (err) {
                                res.render('users/login', { globalError: 'Ooops 500' });
                                return
                            }
                            res.redirect('/')
                        })
                    }
                })
        },
        logout(req, res) {
            req.logout();
            res.redirect('/')
        },
        getByUsername(req, res) {
            let username = req.params.username;
            data.findUserByUsername(username)
                .then(user => {
                    if (user === null) {
                        return res.status(404)
                            .redirect("trips/error");
                    }
                    return res.render('users/profile', {
                        data: user
                    });
                });

        },
        updateProfile(req, res) {
            let user = req.body;

            if (user.password !== '') {

                if (user.password === user.confirmPassword) {
                    user.salt = encryption.generateSalt();
                    user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);
                } else {
                    req.flash('error', 'password didn\'t match');
                    return res.redirect('/users/update-profile');
                }
            }
            // TODO: extract to data layer
            User.update({ _id: req.user._id }, user, (err) => {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/users/update-profile')
                }
                req.flash('success', 'You profile has been updated successfully!');
                res.redirect('/users/update-profile');
            })
        },
        editProfile(req, res) {
            if (req.user) {
                res.render('users/update-profile', { user: req.user })
            }
            else {
                return res.redirect('/users/login');
            }
        }
    }
};
