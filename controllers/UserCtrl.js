var User = require('../models/userModel.js');

module.exports = {

    signup: function(req, res, next) {
        User.create(req.body, function(err, resp) {
            if (err) {
                return res.status(500).json(err);
            }
            newUser = resp.toObject();
            newUser.password = null;
            res.status(200).json(newUser);
        });
    },

    me: function(req, res, next) {
        if (!req.user) {
            return res.status(401).json('current user is not defined');
        }
        req.user.password = null;
        return res.status(200).json(req.user);
    }

};
