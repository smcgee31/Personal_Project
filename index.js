var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require('cors');
var debtCtrl = require('./controllers/debtCtrl.js');

var app = express();

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
