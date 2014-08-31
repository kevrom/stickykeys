'use strict';

var express = require('express');
var Route = express.Router();
var config = require('../config/config');
var passport = require('passport');
var Auth = require(config.root + '/server/middleware/auth');
var userController = require();


Route.get('/', function(req, res) {
	res.render('index', {
		title: 'Express 4'
	});
});

// API Routes
Route
	.all('/api/*', Auth.APIrequiresUserLogin);

// Frontend routes
Route
	.get('/login', userController.login)
	.get('/signup', userController.signup)
	.get('/logout', userController.logout)
	.get('/forgot-password', userController.getForgotPassword)
	.post('/forgot-password',Auth.requireAnon, userController.postForgotPassword)
	.get('/reset/:token', Auth.requireAnon, userController.getResetPassword)
	.post('/reset/:token', Auth.requireAnon, userController.postResetPassword)
	.post('/users/create', userController.create)
	.get('/dashboard', Auth.requireLogin, userController.show)
	.get('/:username', userController.user_profile);

if (config.twitterAuth) {
	Route
		.get('/auth/twitter', passport.authenticate('twitter'))
		.get('/auth/twitter/callback',
			passport.authenticate('twitter',{
			failureRedirect: '/login' }), function(req, res) {
			res.redirect(req.session.returnTo || '/');
		});
}

if (config.facebookAuth) {
	Route
		.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))
		.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
			res.redirect(req.session.returnTo || '/');
		});
}

module.exports = Route;
