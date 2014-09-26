'use strict';

var Route           = require('express').Router();
var config          = require('../../config/config');
var Auth            = require(config.root + '/server/middleware/auth');
var AdminController = require(config.root + '/server/controllers/admin');
var UserAPI         = require(config.root + '/server/controllers/api/v1/User');
var TicketAPI       = require(config.root + '/server/controllers/api/v1/Ticket');
var CustomerAPI     = require(config.root + '/server/controllers/api/v1/Customer');

Route.route('/')
	.all(Auth.requiresLogin)
	.get(AdminController.index);

// API routes
Route.route('/api/*')
	.all(Auth.APIrequiresLogin);

Route.use('/api/v1/users', CustomerAPI.getRoutes());
Route.use('/api/v1/tickets', TicketAPI.getRoutes());
Route.use('/api/v1/customers', CustomerAPI.getRoutes());


module.exports = Route;
