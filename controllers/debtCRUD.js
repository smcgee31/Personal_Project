var Debt = require('../models/debtModel.js');
var User = require('../models/userModel.js');

module.exports = {

    createNewDebt: function(req, res, next) {
        var newDebt = new Debt(req.body);
        newDebt.save(function(err, respdebt) {
            if (err) {
                res.status(500).json(err);
            } else {
                User.findByIdAndUpdate(req.user.id, {$push:{debts: respdebt._id}}, function(err, resp) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(200).json(resp);
                    }
                });
            }
        });
    },

    deleteDebt: function(req, res, next) {
        Debt.findByIdAndRemove(req.params.id, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    getDebts: function(req, res, next) {
        Debt.find().exec(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    payDebt: function(req, res, next) {
        Debt.findByIdAndUpdate(req.params.id, function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    getUserDebts: function(req, res, next) {
        Debt.find({'_id': {$in: req.body.debts}}).exec(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },





};
