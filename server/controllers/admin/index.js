'use strict';

var config = require('../../config/config');
var Ticket = require(config.root + '/server/models').Ticket;
var AdminController = {};

AdminController.index = function(req, res) {
	res.render('admin/index', {
		title: 'Administration',
	});
};

AdminController.partial = function(req, res) {
	var template = 'admin/partials/' + req.params.template;
	res.render(template);
};

module.exports = AdminController;
