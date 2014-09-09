'use strict';

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
		time_requested: {
			type: DataTypes.DATE,
			allowNull: false
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
		}
	}, {
		classMethods: {
			associate: function(models) {
				Ticket.belongsTo(models.Job);
			}
		},
		insanceMethods: {}
	});

	return Ticket;
};
