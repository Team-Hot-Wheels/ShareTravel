const auth = require('../../config/auth');
const express = require("express");
const adminRole = 'Admin';

module.exports = (app, data) => {
    const controllers = require('../../controllers')(data);
    let router = new express.Router();
    router
        .get('/admin/admin-add-user', auth.isInRole(adminRole), controllers.addUserIndex)
        .post('/admin/admin-delete-trip', auth.isInRole(adminRole), controllers.deleteTrip)
        .get('/admin/admin-delete-trip', auth.isInRole(adminRole), controllers.deleteTripIndex)
        .post('/admin/admin-delete-user', auth.isInRole(adminRole), controllers.deleteUser)
        .get('/admin/admin-delete-user', auth.isInRole(adminRole), controllers.deleteUserIndex)
        .get('/admin/admin-add-news', auth.isInRole(adminRole), controllers.addNewsIndex)
        .post('/admin/admin-add-news', auth.isInRole(adminRole), controllers.addNews)
        .get('/admin', auth.isInRole(adminRole), controllers.indexAdmin);

    app.use("/", router);
};