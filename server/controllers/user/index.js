'use strict';

var passport = require('passport');
var UserController = {};

UserController.index = function(req, res) {
	res.render('user/index', {});
};

UserController.login = {
	get: function(req, res) {
		res.render('user/login', {});
	},
	post: function(req, res) {
		// req.session.returnTo is set in Auth middleware
		var redirect = req.session.returnTo || '/';
		delete req.session.returnTo;
		req.flash('success', { msg: 'You are now logged in.' });
		res.redirectTo(redirect);
	}
};

UserController.register = {
	get: function(req, res) {
		console.log('register');
	},
	post: function(req, res) {
		console.log('registerpost');
	}
};

UserController.logout = function(req, res) {
	req.logout();
	req.flash('success', { msg: 'Successfully logged out.' });
	res.redirect('/');
};

module.exports = UserController;
