'use strict';

var Route = require('express').Router();
var passport = require('passport');
var config = require('../../config/config');
var Auth = require(config.root + '/server/middleware/auth');
var userController = require(config.root + '/server/controllers/user/index');

Route
	.get('/login', userController.login.get)
	.post('/login', passport.authenticate('local', {
		failureRedirect: '/login',
		failureFlash: true
	}), userController.login.post)
	.get('/register', userController.register.get)
	.get('/logout', userController.logout);
	//.get('/forgot-password', userController.getForgotPassword)
	//.post('/forgot-password',Auth.requiresAnon, userController.postForgotPassword)
	//.get('/reset/:token', Auth.requiresAnon, userController.getResetPassword)
	//.post('/reset/:token', Auth.requiresAnon, userController.postResetPassword)
	//.post('/users/create', userController.create)
	//.get('/dashboard', Auth.requiresLogin, userController.show)
	//.get('/:username', userController.user_profile);

module.exports = Route;
