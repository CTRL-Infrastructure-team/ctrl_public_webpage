const express = require('express'),
    app = express(),
    router = express.Router(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    database = require('../models/models'),
    Users = database.Users,
    session = require('express-session');

router.use(passport.initialize());
router.use(passport.session());
        router.use(session({
            secret: 'keyboard cat',
            resave: true,
            saveUninitialized: false,
        }));

//後でpostに返る
router.get('/users', (req, res, next) => {
    console.log('/api/users');
    
    // let receiveName = req.body.username,
    //     receivePassword = req.body.password,
    let receiveName = 'cotton',
    receivePassword = 'password',
    newUser = new Users({
        'username': receiveName,
        'password': receivePassword
    });
    
    newUser.save((err) => {
        res.redirect('/');
    });
});

router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/progress',
        // failureFlash: true,
        session: true
    })
);

router.get('/test', (req, res, next) => {
    console.log(req.session);
    res.send();
})

router.post('/logout', (req, res, next) => {

});

module.exports = router