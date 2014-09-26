'use strict';

// Module dependencies
var path      = require('path');
var express   = require('express');
var passport  = require('passport');
var config    = require('./server/config/config');
var app       = express();
var server    = require('http').Server(app);
var io        = require('socket.io')(server);

// App configuration
app.config = config;

// Database initialization
require('./server/models')
	.sequelize
	.sync()
	.complete(function(err, res) {
		if (err) {
			throw err[0];
		}
	});

// Passport settings
require('./server/config/passport')(app, passport);

// Express settings
require('./server/config/express')(app, express, passport);

// Socket.IO
require('./server/socket')(io);


server
	.listen(app.get('port'), config.server.hostname, function (err) {

		if (err) {
			return console.trace(err);
		}

		console.log("\n✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));

	})
	.on('error', function (err) {
		console.error('✗ '+ app.get('port') + err);
		// TODO: do something with the error
	});

module.exports = app;
