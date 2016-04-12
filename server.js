
// BASE SETUP
// =============================================================================

var express      = require('express');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var app          = express();
var router       = require('./app/routes/index');
// var staticRouter = require('./app/routes/static');

// configuration ===============================================================

// process.env.MONGOHQ_URL uses the MongoHQ Heroku addon
// var db_url = process.env.MONGOHQ_URL || 'mongodb://localhost/my_database';
var db_url = 'mongodb://mark:morals@ds023520.mlab.com:23520/process';
mongoose.connect(db_url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log('Database connected!'); });

// NOTE: lots to this stuff - https://github.com/expressjs/body-parser
// let us pull POST content from our HTTP request so that we can do things like create a bear.
app.use(bodyParser.urlencoded({ extended: true }));  // parse application/x-www-form-urlencoded 
app.use(bodyParser.json()); // parse application/json 

// Load distribution or development code
if (process.argv[2] === 'dist') {
	console.log('Loading distribution code');
	app.use(express.static(__dirname + '/dist')); // For testing production
} else {
	// lets you access everything rather than just /public or /app
	// Matters why? b/c we serve index.html from / not /assets
	app.use(express.static(__dirname));	
}

var port = process.env.PORT || 4000;

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);
// app.use('/', staticRouter);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);