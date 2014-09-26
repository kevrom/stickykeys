'use strict';

var config = require('../../../config/config');
var models = require(config.root + '/server/models');
var Ticket = models.Ticket;
var Customer = models.Customer;
var User = models.User;

function Model(model) {
	this.model = model;

	this.toString = function() {
		return '[ API: ' + this.model + ' ]';
	};

	this.findAll = function(req, res) {
		models[model]
			.findAll()
				.success(function(objs) {
					res.send(objs);
				})
				.error(function(err) {
					console.error(err);
				});
	};

	this.find = function(req, res) {
		models[model]
			.find({
				where: {
					id: req.params.id
				}
			})
			.success(function(obj) {
				console.log(obj);
			})
			.error(function(err) {
				console.error(err);
			});
	};
}

module.exports = Model;
