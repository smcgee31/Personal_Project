var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var cors = require('cors');
var session = require('express-session');
var passport = require('passport');
var debtCRUD = require('./controllers/debtCRUD.js');
var userCRUD = require('./controllers/userCRUD.js');
var FacebookStrategy = require('passport-facebook').Strategy;
// ^^ capitalized because it is a constructor
var keys = require('./keys.js');


var app = express();


app.use(session({secret: keys.sessionSecret, saveUninitialized: true}));
// ^^ use session must come before you set passport.session
app.use(passport.initialize());
app.use(passport.session());

// ------------  facebook Auth ------------
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

// ---------- end facebook Auth -----------



app.use(express.static(__dirname+'/public'));

// var corsOptions = {
//     origin: 'http://localhost:3030'
// };


app.use(bodyParser.json());
// app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost/waterfall', function(err) {
    if (err) {
        throw err;
    }
});

app.get('/api/user', userCRUD.getUser);
app.post('/api/user', userCRUD.createNewUser);

app.post('/api/waterfall', debtCRUD.createNewDebt);
app.delete('/api/waterfall/:id', debtCRUD.deleteDebt);
app.get('/api/waterfall', debtCRUD.getDebts);



var port = 3030;
app.listen(port, function() {
    console.log('--------------------');
    console.log('PARTY ON PORT', port);
    console.log('--------------------');
});
//57310484d847bb2c331c6f34
