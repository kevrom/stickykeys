'use strict';

var IndexController = {};

IndexController.index = function(req, res) {
	res.render('index', {
		title: 'Express 4'
	});
};

IndexController.ticket = function(req, res) {
	console.log(req.body);
};

module.exports = IndexController;
