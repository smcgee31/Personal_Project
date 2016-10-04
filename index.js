var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require('express-session');
var passport = require('passport');
var debtCRUD = require('./controllers/debtCRUD.js');
var userCRUD = require('./controllers/userCRUD.js');
var User = require('./controllers/UserCtrl.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var keys = require('./keys.js');
var passport = require('./services/passport.js');
var serverConfig = require('./server_config.js');
var favicon = require('serve-favicon');
var port = serverConfig.serverPort;
var moment = require('moment');
moment().format();

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



app.get('/me', function(req, res, next) {
    res.send(req.user);
});

app.use(express.static( __dirname + '/public' ));
app.use(favicon( __dirname + '/public/img/favicon.ico' ));

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
  return res.status(200).json('logged out');
});

app.get('/api/user', userCRUD.getUser);
app.post('/api/user', userCRUD.createNewUser);
app.put('/api/user/:id', userCRUD.updateUser);

app.post('/api/user/waterfall', debtCRUD.getUserDebts);
app.post('/api/waterfall/:id', debtCRUD.createNewDebt);
app.delete('/api/waterfall/:id', debtCRUD.deleteDebt);
app.get('/api/waterfall', debtCRUD.getDebts);
app.put('/api/waterfall', debtCRUD.payDebt);


app.listen(port, function() {
    console.log('--------------------');
    console.log('Listening on ', port);
    console.log('--------------------');
});
