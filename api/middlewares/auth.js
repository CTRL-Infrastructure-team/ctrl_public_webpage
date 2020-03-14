const User = require('../models/model');

module.exports = (req, res, next) => {
    if(req.session.user) {
        User.findById(id).lean.exec((err, result) => {
            
        });
    }
}