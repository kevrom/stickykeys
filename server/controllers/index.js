'use strict';

var IndexController = {};

IndexController.index = function(req, res) {
	res.render('index', {
		title: 'Express 4'
	});
};

module.exports = IndexController;
