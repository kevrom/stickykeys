'use strict';

var config = require('../../config/config');

if (config.localAuth) {
	// bring in local auth routes
	require('local');
}

if (config.twitterAuth) {
	// bring in twitter auth routes
	require('twitter');
}

if (config.facebookAuth) {
	// bring in facebook auth routes
	require('facebook');
}

if (config.googleAuth) {
	// bring in google auth routes
	require('google');
}
