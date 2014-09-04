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
	.all('/api/*', Auth.APIrequireLogin);

// User routes
require('./user');



module.exports = Route;
