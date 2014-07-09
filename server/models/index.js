var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var config    = require('../config/config')
var sequelize = new Sequelize(config.database.name, config.database.username, config.database.password);
var db        = {};

// Load all models in the models directory
fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
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
