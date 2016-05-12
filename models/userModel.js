var mongoose = require('mongoose');
var objectId  = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    fName: {type: String, required: false},
    lname: {type: String, required: false},
    email: {type: Number, required: false},
    username: {type: String, required: true, minLength: 3},
    debts: [
        {type: objectId, ref: 'Debt'}
    ],
    facebookId: {type: Number, required: false}
});

module.exports = mongoose.model('User', userSchema);
