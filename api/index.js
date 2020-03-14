const express = require("express"),
    app = express(),
    progress = require('./controllers/progress'),
    situations = require('./controllers/situations'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    database = require('./models/models');

let pastWorks = database.pastWorks;
    currentSituation = database.currentSituation;

// app.use('/', progress);
// app.use('/', situations);

//strategy用のフォルダを作成してぶち込む
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
        let findedPassword = user.password,
            checkPassword = bcrypt.compareSync(password, findedPassword);
        
        if(err) {
            return done(err);
        }
        if(!user) {
            return done(null, false, { message: 'ユーザ名が間違っています。' });
        }
        if(!checkPassword) {
            return done(null, false, { message: 'パスワードが間違っています。' })
        }
        return done(null, user);
    });
}));

passport.serializeUser((id, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

module.exports = {
    path: "/api/",  
    handler: app
};