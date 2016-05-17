var mongoose = require('mongoose');
var objectId  = mongoose.Schema.Types.ObjectId;

var debtSchema = new mongoose.Schema({
    name: {type: String, required: true, maxlength: 20},
    rate: {type: Number, required: true, min: 0},
    base: {type: Number, required: true, min: 0},
    balance: {type: Number, required: true, min: 0},
    user: {type: objectId, ref: 'User'}
});

module.exports = mongoose.model('Debt', debtSchema);
