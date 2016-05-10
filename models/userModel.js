var mongoose = require('mongoose');
var debtSchema = require("./debtSchema.js");


var userSchema = new mongoose.Schema({
    fName: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: Number, required: true},
    username: {type: String, required: true, minLength: 3},
    debts: debtSchema
});

module.exports = mongoose.model('User', userSchema);
