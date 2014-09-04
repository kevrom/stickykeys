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
		var redirect = req.session.returnTo || '/';
		delete req.session.returnTo;
		req.flash('success', { msg: 'You are now logged in.' });
		res.redirectTo(redirect);
	}
};

module.exports = UserController;
