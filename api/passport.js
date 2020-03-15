const passport = require('passport');
    local = require('./passport/local');

module.exports = () => {
    passport.use('local', local);
    
    passport.serializeUser((user, done) => {
        console.log('シリアライズ');
        console.log(user._id);
        done(null, user._id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    })
}