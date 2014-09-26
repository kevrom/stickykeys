'use strict';

var passport = require('passport');
var Auth     = {};

// URLs that require user to be logged out
Auth.requiresAnon = function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	} else {
		next();
	}
};

// URLs that require user to be logged in
Auth.requiresLogin = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	if (req.method === 'GET') {
		req.session.returnTo = req.originalUrl;
	}
	res.redirect('/login');
};

// API URLs that require user to be logged in
Auth.APIrequiresLogin = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	var err = {
		status: 403,
		message: 'Unauthorized'
	};
	return res.json(200, err);
};

Auth.authenticate = function(req, res, next) {
	passport.authenticate('local', {
		successRedirect: '/admin',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: 'Successfully logged in.'
	})(req, res, next);
};

module.exports = Auth;
