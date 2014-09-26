'use strict';

var Route = require('express').Router();
var config = require('../../config/config');
var Auth = require(config.root + '/server/middleware/auth');
var AdminController = require(config.root + '/server/controllers/admin');
var TicketAPI = require(config.root + '/server/controllers/api/v1/Ticket');

Route.route('/')
	.all(Auth.requiresLogin)
	.get(AdminController.index);

Route.route('/api/v1/tickets/')
	.get(TicketAPI.findAll);

module.exports = Route;
