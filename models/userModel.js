var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var objectId  = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
    fName: {type: String, required: false},
    lName: {type: String, required: false},
    email: {type: String, required: false, unique: true},
    password: {type: String, required: false, minLength: 3},
    debts: [
        {type: objectId, ref: 'Debt'}
    ],
    facebookId: {type: Number, required: false},
    monthlyCommit: {type: Number}
});

userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});

userSchema.methods.verifyPassword = function(reqBodyPassword) {
    var user = this;
    return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', userSchema);
