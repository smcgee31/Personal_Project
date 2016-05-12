var User = require('../models/userModel.js');

module.exports = {

    createNewUser: function(req, res, next) {
        User.findOne({facebookId: req.body.id})
        .populate('debts')
        .exec(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                if (resp) {
                    // req.user = resp;
                    res.status(200).json(resp);
                } else {
                    var newUser = new User({username: req.body.displayName, facebookId: req.body.id});
                    newUser.save(function(err, resp) {
                        if (err) {
                            res.status(500).json(err);
                        } else {
                            // req.user = resp;
                            res.status(200).json(resp);
                        }
                    });
                }
            }
        });
    },

    deleteUser: function(req, res, next) {
        User.findByIdAndRemove(req.params.id, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    getUser: function(req, res, next) {
        User.findOne({facebookId: req.user.id})
        .populate({path: 'debts', select: 'name rate base balance'})
        .exec(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    updateUser: function(req, res, next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    }




};
