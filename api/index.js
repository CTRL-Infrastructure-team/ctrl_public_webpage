const express = require("express"),
    app = express(),
    router = express.Router(),
    progress = require('./controllers/progress'),
    situations = require('./controllers/situations'),
    bodyParser = require('body-parser'),
    users = require('./controllers/users'),
    passport = require('passport'),
    session = require('express-session'),
    database = require('./models/models');

let pastWorks = database.pastWorks;
    currentSituation = database.currentSituation;

app.use(bodyParser.urlencoded({ extended: false }));
    
app.use('/', progress);
app.use('/', situations);
app.use('/', users);
// require('./passport')(app);
const passportConfig = require('./passport');
passportConfig(app);
// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: false,
//   }));
app.use(passport.session());
app.use(passport.initialize());

module.exports = {
    path: "/api/",  
    handler: app
};