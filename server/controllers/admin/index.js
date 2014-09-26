'use strict';

var config = require('../../config/config');
var Ticket = require(config.root + '/server/models').Ticket;
var AdminController = {};

AdminController.index = function(req, res) {
	Ticket
		.findAll()
		.success(function(tickets) {
			res.render('admin/index', {
				title: 'Administration',
				tickets: tickets
			});
		})
		.error(function(err) {
			console.error(err);
		});
};

module.exports = AdminController;
