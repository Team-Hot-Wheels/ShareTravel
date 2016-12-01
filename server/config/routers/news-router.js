const auth = require('../../config/auth');
const express = require("express");

module.exports = (app, data) => {
    const controllers = require('../../controllers')(data);
    let router = new express.Router();
    // TODO:
    //router.get('/news/create', auth.isInRole('Admin'), controllers.createNews);
    app.use("/", router);
};