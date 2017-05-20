//require epress to create app
var express = require('express');

//require body parser to parse json and url
var bodyParser = require('body-parser');

//require mongoose for the
var mongoose = require('mongoose');

//require cors for cross origin
var cors = require('cors');

// require morgan to log activities
var morgan = require('morgan');

//require http and https for creating server and establishing secure conncetions
var http = require('http');
var https = require('https');

//require pem for generating private and certificate keys and making secure conncetion for hosting
var pem = require('pem');

const config = require('./config/database');
//connecting mongodb

mongoose.connect(config.database);

//On connected
mongoose.connection.on('connect', () => {
	console.log('database connected' + config.database);
});

//On error
mongoose.connection.on('error', err => {
	console.log('database error:' + err);
});

var app = express();

//require routers for routing

var routers = require('./router/routers');

//require all middlewares

var middlewares = require('./middlewares');

app.use(cors());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routers.route(app, middlewares);

app.use('/api', routers.route);

/**
 *creating certificate for secure connection and listening  @port 443
 *
 *
 *
 */

pem.createCertificate({ days: 1, selfSigned: true }, (err, keys) => {
	if (err) {
		throw err;
	}

	https
		.createServer(
			{
				key: keys.serviceKey,
				cert: keys.certificate,
			},
			app
		)
		.listen(config.port, function() {
			console.log('Express server listening on port ' + config.port);
		});
});
