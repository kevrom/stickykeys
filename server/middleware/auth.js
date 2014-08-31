'use strict';

var passport = require('passport');
var Auth = {};

Auth.requireAnon = function(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	} else {
		next();
	}
};

Auth.requireLogin = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	if (req.method === 'GET') {
		req.session.returnTo = req.originalUrl;
	}
	res.redirect('/login');
};

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

module.exports = Auth;
