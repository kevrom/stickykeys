'use strict';

var Route          = require('express').Router();
var passport       = require('passport');
var config         = require('../../config/config');
var Auth           = require(config.root + '/server/middleware/auth');
var UserController = require(config.root + '/server/controllers/user/index');

Route
	.get('/login', UserController.login.get)
	.post('/login', passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true,
		successFlash: 'Successfully logged in.'
	}), UserController.login.post)
	.get('/register', UserController.register.get)
	.get('/logout', UserController.logout);
	//.get('/forgot-password', UserController.forgotPassword.get)
	//.post('/forgot-password',Auth.requiresAnon, UserController.forgotPassword.post)
	//.get('/reset/:token', Auth.requiresAnon, UserController.resetPassword.get)
	//.post('/reset/:token', Auth.requiresAnon, UserController.resetPassword.post)
	//.get('/me', Auth.requiresLogin, UserController.show)
	//.get('/u/:username', UserController.user_profile);

module.exports = Route;
