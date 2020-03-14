const express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    database = require('../models/models'),
    User = database.User;

app.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', (req, res, next) => {

});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    });
});

router.post('/logout', (req, res, next) => {

});

module.exports = router