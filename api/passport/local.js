const database = require('../models/models'),
    Users = database.Users,
    bcrypt = require('bcrypt'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
    }, 
    (req, username, password, done) => {
        console.log('ここまでは来てる')
        // console.log(checkPassword)
        Users.findOne({ username: username }, (err, user) => {
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
});