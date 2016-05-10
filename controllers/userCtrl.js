var User = require('../models/userModel.js');

module.exports = {

    createNewUser: function(req, res, next) {
        var newUser = new User(req.body);
        newUser.save(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
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
        User.find().exec(function(err, resp) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },

    Login: function(req, res, next){
        User.findOne(req.body, function(err, response){
            if(err){
                res.status(500).json(err);
            }else{
                if(response){
                    res.status(200).json({login: true, user: response});
                }else{
                    res.status(200).json({login: false});
                }

            }
        });
    }



};
