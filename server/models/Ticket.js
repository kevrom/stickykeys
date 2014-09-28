'use strict';

var config     = require('../config/config');

module.exports = function(sequelize, DataTypes) {
	var Ticket = sequelize.define('Ticket', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		time: {
			type: DataTypes.DATE,
		},
		date: {
			type: DataTypes.DATE
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		wantsNotification: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		allowEmail: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		allowText: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		problem: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		resolved: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		labor: {
			type: DataTypes.TEXT
		},
		parts: {
			type: DataTypes.TEXT
		},
		laborPrice: {
			type: DataTypes.STRING
		},
		partsPrice: {
			type: DataTypes.STRING
		}
	}, {
		classMethods: {
			associate: function(models) {
				Ticket.belongsTo(models.Customer);
			}
		},
		insanceMethods: {},
		hooks: {}
	});

	return Ticket;
};
