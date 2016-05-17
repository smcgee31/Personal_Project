var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');
var debtCRUD = require('./controllers/debtCRUD.js');
var userCRUD = require('./controllers/userCRUD.js');
var User = require('./controllers/UserCtrl.js');
var FacebookStrategy = require('passport-facebook').Strategy;
// ^^ capitalized because it is a constructor
var keys = require('./keys.js');
var passport = require('./services/passport.js');

var isAuthed = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json();
    }
    return next();
};


var app = express();


app.use(session({
    secret: keys.sessionSecret,
    saveUninitialized: false,
    resave: false
}));
// ^^ use session must come before you set passport.session
app.use(passport.initialize());
app.use(passport.session());


// //  FACEBOOK AUTH  //
// passport.use(new FacebookStrategy({
//   clientID: keys.facebookKey,
//   clientSecret: keys.facebookSecret,
//   callbackURL: 'http://localhost:3030/login/facebook/callback'  // < must match the callback url you gave facebook
// }, function(token, refreshToken, profile, done) {
//   return done(null, profile);
// }));
//
// // start
// app.get('/login/facebook', passport.authenticate('facebook'));
// // callback for facebook
// app.get('/login/facebook/callback', passport.authenticate('facebook', {
//     successRedirect: '/#/waterfall',
//     failureRedirect: '/login/facebook'
// }));
//
// // the next two items are because we are using passport-session
// passport.serializeUser(function(user, done) {
//     // go to mongo get _id for user, put that on session
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//     // get data off of session (see serializeUser)
//   done(null, obj);
//   // put it on req.user in EVERY ENDPOINT
// });
// //  END FACEBOOK AUTH  //

app.get('/me', function(req, res, next) {
    res.send(req.user);
});




app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/waterfall', function(err) {
    if (err) {
        throw err;
    }
});

//  LOGIN - LOGOUT  //
app.post('/signup', User.signup);
app.get('/me', isAuthed, User.me);


app.post('/login', passport.authenticate('local', {
    successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});


app.get('/api/user', userCRUD.getUser);
app.post('/api/user', userCRUD.createNewUser);
app.put('/api/user/:id', userCRUD.updateUser);

app.post('/api/user/waterfall', debtCRUD.getUserDebts);
app.post('/api/waterfall/:id', debtCRUD.createNewDebt);
app.delete('/api/waterfall/:id', debtCRUD.deleteDebt);
app.get('/api/waterfall', debtCRUD.getDebts);
app.put('/api/waterfall', debtCRUD.payDebt);


var port = 3030;
app.listen(port, function() {
    console.log('--------------------');
    console.log('PARTY ON PORT', port);
    console.log('--------------------');
});
