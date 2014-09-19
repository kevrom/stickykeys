'use strict';

var IndexController = {};
var config = require('../config/config');
var Ticket = require(config.root + '/server/models').Ticket;

IndexController.index = function(req, res) {
	res.render('index', {
		title: 'Computer Repair and Website Design'
	});
};

IndexController.ticket = function(req, res) {
	console.log(req.body);

	//Ticket.create({
		//name: req.body.fullName,
		//email: req.body.email,
		//phone: req.body.phone,
		//allow_email: req.body.allowEmail,
		//problem: req.body.problem
	//});

	req.flash('success', 'Thanks for contacting us.  We will get back with you as soon as possible.');
	res.redirect('/');
};

module.exports = IndexController;
