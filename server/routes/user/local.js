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
	//.get('/forgot-password', UserController.getForgotPassword)
	//.post('/forgot-password',Auth.requiresAnon, UserController.postForgotPassword)
	//.get('/reset/:token', Auth.requiresAnon, UserController.getResetPassword)
	//.post('/reset/:token', Auth.requiresAnon, UserController.postResetPassword)
	//.post('/users/create', UserController.create)
	//.get('/dashboard', Auth.requiresLogin, UserController.show)
	//.get('/:username', UserController.user_profile);

module.exports = Route;
