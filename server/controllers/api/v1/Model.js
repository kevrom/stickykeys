'use strict';

var config = require('../../../config/config');
var models = require(config.root + '/server/models');
var Ticket = models.Ticket;
var Customer = models.Customer;
var User = models.User;

function Model(model, routeString) {
	this.model = model;

	this.toString = function() {
		return '[ API: ' + this.model + ' ]';
	};

	this.getRoutes = function() {
		var router = require('express').Router();
		return router
			.get('/', this.findAll)
			.post('/', this.create)
			.get('/:id', this.find)
			.put('/:id', this.update)
			.delete('/:id', this.delete);
	};

	this.findAll = function(req, res) {
		return models[model]
			.findAll()
				.success(function(objs) {
					res.send(objs, 200);
				})
				.error(function(err) {
					res.send(err, 500);
				});
	};

	this.find = function(req, res) {
		return models[model]
			.find({
				where: {
					id: req.params.id
				}
			})
			.success(function(obj) {
				res.send(obj, 200);
			})
			.error(function(err) {
				res.send(err, 500);
			});
	};

	this.create = function(req, res) {
		return models[model]
			.create(req.body)
			.success(function(obj) {
				res.send(obj, 200);
			})
			.error(function(err) {
				res.send(err, 500);
			});
	};

	this.update = function(req, res) {
		return models[model]
			.find({
				where: {
					id: req.params.id
				}
			})
			.success(function(obj) {
				obj.updateAttributes(req.body)
					.success(function(obj) {
						res.send(obj, 200);
					})
					.error(function(err) {
						res.send(err, 500);
					});
			})
			.error(function(err) {
				res.send(err, 500);
			});
	};

	this.delete = function(req, res) {
		return models[model]
			.find({
				where: {
					id: req.params.id
				}
			})
			.success(function(obj) {
				obj.destroy()
					.success(function() {
						res.send(200);
					})
					.error(function(err) {
						res.send(err, 500);
					});
			})
			.error(function(err) {
				res.send(err, 500);
			});
	};
}

module.exports = Model;
