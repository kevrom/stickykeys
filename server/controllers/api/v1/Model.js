'use strict';

var config = require('../../../config/config');
var models = require(config.root + '/server/models');

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
					res.status(200).send(objs);
				})
				.error(function(err) {
					res.status(500).send(err);
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
				res.status(200).send(obj);
			})
			.error(function(err) {
				res.status(500).send(err);
			});
	};

	this.create = function(req, res) {
		return models[model]
			.create(req.body)
			.success(function(obj) {
				res.status(200).send(obj);
			})
			.error(function(err) {
				res.status(500).send(err);
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
						res.status(200).send(obj);
					})
					.error(function(err) {
						res.status(500).send(err);
					});
			})
			.error(function(err) {
				res.status(500).send(err);
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
						res.status(200);
					})
					.error(function(err) {
						res.status(500).send(err);
					});
			})
			.error(function(err) {
				res.status(500).send(err);
			});
	};
}

module.exports = Model;
