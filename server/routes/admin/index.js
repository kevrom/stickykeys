'use strict';

var Route = require('express').Router();
var config = require('../../config/config');
var Auth = require(config.root + '/server/middleware/auth');
var AdminController = require(config.root + '/server/controllers/admin');

Route
	.get('/', Auth.requiresLogin, AdminController.index);

module.exports = Route;
