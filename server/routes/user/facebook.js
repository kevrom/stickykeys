'use strict';

var Route    = require('express').Router();
var passport = require('passport');

Route
	.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))
	.get('/auth/facebook/callback',
		passport.authenticate('facebook',
		{ failureRedirect: '/login' }),
		function(req, res) {
			res.redirect(req.session.returnTo || '/');
		});

module.exports = Route;
