var Debt = require('../models/debtSchema.js');

module.exports = {

    createNewDebt: function(req, res, next) {
        var newDebt = new Debt(req.body);
        newDebt.save(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
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




};
