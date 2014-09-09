'use strict';

var AdminController = {};

AdminController.index = function(req, res) {
	res.render('admin/index', {});
};

module.exports = AdminController;
