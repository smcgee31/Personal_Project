var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var debtCtrl = require('./controllers/debtCtrl.js');
var FacebookStrategy = require('passport-facebook').Strategy;
// ^^ capitalized because it is a constructor
var keys = require('./keys.js');


var app = express();

app.use(session({secret: 'some-random-string'}));
// ^^ use session must come before you set passport.session
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: keys.facebookKey,
  clientSecret: keys.facebookSecret,
  callbackURL: 'http://localhost:3030/login/facebook/callback'  // < must match the callback url you gave facebook
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

// start
app.get('/login/facebook', passport.authenticate('facebook'));
// callback for facebook
app.get('/login/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/#/waterfall',
    failureRedirect: '/login/facebook'
}));

// the next two items are because we are using passport-session
passport.serializeUser(function(user, done) {
    // go to mongo get _id for user, put that on session
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
    // get data off of session (see serializeUser)
  done(null, obj);
  // put it on req.user in EVERY ENDPOINT
});

app.get('/me', function(req, res, next) {
    res.send(req.user);
});



app.use(express.static(__dirname+'/public'));

var corsOptions = {
    origin: 'http://localhost:3030'
};


app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost/waterfall', function(err) {
    if (err) {
        throw err;
    }
});

app.post('/api/waterfall', debtCtrl.createNewDebt);
app.delete('/api/waterfall/:id', debtCtrl.deleteDebt);
app.get('/api/waterfall', debtCtrl.getDebts);




var port = 3030;
app.listen(port, function() {
    console.log('--------------------');
    console.log('PARTY ON PORT', port);
    console.log('--------------------');
});
//57310484d847bb2c331c6f34
