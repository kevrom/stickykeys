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
		wants_notification: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		allow_email: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		allow_text: {
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
		labor_price: {
			type: DataTypes.STRING
		},
		parts_price: {
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
