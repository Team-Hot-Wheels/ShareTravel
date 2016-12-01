const auth = require('../../config/auth');
const express = require("express");

module.exports = (app, data) => {
    const controllers = require('../../controllers')(data);
    let router = new express.Router();
    router
        .get('/admin/admin-add-user', auth.isInRole('Admin'), controllers.addUserIndex)
        .post('/admin/admin-delete-trip', auth.isInRole('Admin'), controllers.deleteTrip)
        .get('/admin/admin-delete-trip', auth.isInRole('Admin'), controllers.deleteTripIndex)
        .post('/admin/admin-delete-user', auth.isInRole('Admin'), controllers.deleteUser)
        .get('/admin/admin-delete-user', auth.isInRole('Admin'), controllers.deleteUserIndex)
        .get('/admin', auth.isInRole('Admin'), controllers.indexAdmin);

    app.use("/", router);
};