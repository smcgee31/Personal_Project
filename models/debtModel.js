var mongoose = require('mongoose');

var debtSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rate: {type: Number, required: true, min: 0},
    base: {type: Number, required: true, min: 0},
    balance: {type: Number, required: true, min: 0}
});

module.exports = mongoose.model('Debt', debtSchema);
