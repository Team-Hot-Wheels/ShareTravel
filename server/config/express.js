const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

module.exports = (config, app) => {
    app.set('view engine', 'pug');
    app.set('views', config.rootPath + 'server/views');

    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'neshto-taino!@#$%',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user
        }

        next()
    });
    app.use(express.static(config.rootPath + 'public'))
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.errorMessage = req.flash('error');
        res.locals.successMessage = req.flash('success');
        next();

    });
};
