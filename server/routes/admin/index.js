'use strict';

var Route           = require('express').Router();
var params          = require('express-params');
var config          = require('../../config/config');
var Auth            = require(config.root + '/server/middleware/auth');
var AdminController = require(config.root + '/server/controllers/admin');
var UserAPI         = require(config.root + '/server/controllers/api/v1/User');
var TicketAPI       = require(config.root + '/server/controllers/api/v1/Ticket');
var CustomerAPI     = require(config.root + '/server/controllers/api/v1/Customer');

params.extend(Route);

// API routes
Route.route('/api/*')
	.all(Auth.APIrequiresLogin);

// Template routing, regex checks to make sure template is onlu alphanumberic, with underscores and dashes
Route.param('template', /^[a-zA-Z0-9-_]+$/);
Route.get('/partials/:template', AdminController.partial);

// Load the routes from the API controllers
Route.use('/api/v1/users', CustomerAPI.getRoutes());
Route.use('/api/v1/tickets', TicketAPI.getRoutes());
Route.use('/api/v1/customers', CustomerAPI.getRoutes());

// All other admin routes go to index
Route.route('/*')
	.all(Auth.requiresLogin)
	.get(AdminController.index);

module.exports = Route;
