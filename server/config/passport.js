'use strict';

module.exports = function (app, passport) {

	/*
	* Sign in Locally
	*/
	if (app.config.localAuth) {
		require('./strategies/local.js')(passport);
	}

	/*
	* Sign in with Twitter.
	*/
	if (app.config.twitterAuth) {
		require('./strategies/twitter.js')(app, passport);
	}

	/*
	* Sign in with Facebook.
	*/
	if (app.config.facebookAuth) {
		require('./strategies/facebook.js')(app, passport);
	}

};
