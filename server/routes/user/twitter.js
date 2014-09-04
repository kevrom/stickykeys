'use strict';

var Route = require('express').Router();
var passport = require('passport');

Route
	.get('/auth/twitter', passport.authenticate('twitter'))
	.get('/auth/twitter/callback',
		passport.authenticate('twitter',
		{ failureRedirect: '/login' }),
		function(req, res) {
			res.redirect(req.session.returnTo || '/');
		});

module.exports = Route;
