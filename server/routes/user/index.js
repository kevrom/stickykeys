'use strict';

var Route = require('express').Router();
var config = require('../../config/config');

if (config.localAuth) {
	// bring in local auth routes
	Route.use(require('./local'));
}

if (config.twitterAuth) {
	// bring in twitter auth routes
	Route.use(require('./twitter'));
}

if (config.facebookAuth) {
	// bring in facebook auth routes
	Route.use(require('./facebook'));
}

if (config.googleAuth) {
	// bring in google auth routes
	Route.use(require('./google'));
}

module.exports = Route;
