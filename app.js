// Module dependencies
var path      = require('path');
var http      = require('http');
var fs        = require('fs');
var express   = require('express');
var Sequelize = require('sequelize');
var passport  = require('passport');
var config    = require(__dirname + '/app/config/config');
var app       = express();

// App configuration
app.config = config;

// Database
var db = require('./server/models');
db
	.sequelize
	.sync()
	.complete(function(err) {
		if err {
			throw err[0]
		}
	});

// Passport settings
require('./app/config/passport')(app, passport);

// Express settings
require('./app/config/express')(app, express, passport);


var server = http.createServer(app)
	.listen(app.get('port'), config.server.hostname, function (err) {

		if (err) {
			return console.trace(err);
		}

		console.log("\n✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));

	});

server.on('error', function (err) {
	console.error('✗ '+ app.get('port') + err);
	// TODO: do something with the error
});

module.exports = app;