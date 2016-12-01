let User = require('../models/User');
let Trip = require('../models/Trip');

module.exports = function (data) {
    return {
        indexAdmin(req, res) {
            res.render('admin/admin-main');

        },
        deleteUserIndex(req, res) {
            data.getAllUsers(req, res)
                .then(users => {
                    res.render('admin/admin-delete-user', { data: users });
                })
        },
        deleteUser(req, res) {
            data.deleteUser(req, res).then(() =>
                res.redirect('/admin/admin-delete-user'));
        },
        deleteTripIndex(req, res) {
            data.getAllTrips().then(trips => {
                res.render('admin/admin-delete-trip', { data: trips });
            })
        },
        deleteTrip(req, res) {
            let tripId = req.body.id;

            data.deleteTrip(tripId).then(() =>
                res.redirect('/admin/admin-delete-trip'));
        },
        addUserIndex(req, res) {
            // TODO: to refactor
            res.render('admin/admin-add-user');
        },
        addUser(req, res) {
            // TODO: to refactor
            res.render('admin/admin-add-user');
        }
    }
};