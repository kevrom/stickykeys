var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var sequelize = new Sequelize('sequelize_test', 'root', null);
var db        = {};

// Load all models in the models directory
fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0);
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

// Execute associations for models
Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

module.exports = _.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db);