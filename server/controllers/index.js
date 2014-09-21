'use strict';

var IndexController = {};
var config = require('../config/config');
var Emailer = require(config.root + '/server/utils/emailer');
var Ticket = require(config.root + '/server/models').Ticket;

IndexController.index = function(req, res) {
	res.render('index', {
		title: 'Computer Repair and Website Design'
	});
};

IndexController.ticket = function(req, res) {
	var data = req.body;
	var customerEmailOptions = {
		template: 'customer',
		subject: 'Request for Support',
		to: {
			name: req.body.fullName,
			email: req.body.email
		}
	};
	var supportEmailOptions = {
		template: 'ticket',
		subject: 'Appointment Request - ' + req.body.fullName,
		to: {
			name: 'Sticky Keys Support',
			email: 'support@sticky-keys.com'
		}
	};

	//Ticket.create({
		//name: req.body.fullName,
		//email: req.body.email,
		//phone: req.body.phone,
		//allow_email: req.body.allowEmail,
		//problem: req.body.problem
	//});

	if (data.allowEmail) {
		var customerEmail = new Emailer(customerEmailOptions, data);
		customerEmail.send(function(err, info) {
			if (err) { console.error(err); }
		});
	}

	var ticketEmail = new Emailer(supportEmailOptions, data);
	ticketEmail.send(function(err, info) {
		if (err) { console.error(err); }
	});

	req.flash('success', 'Thanks for contacting us, ' + data.fullName + '.  We will get back with you as soon as possible.');
	res.redirect('/');
};

module.exports = IndexController;
