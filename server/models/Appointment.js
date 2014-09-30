'use strict';

module.exports = function(sequelize, DataTypes) {
	var Appointment = sequelize.define('Appointment', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING
		},
		time: {
			type: DataTypes.STRING
		},
		date: {
			type: DataTypes.DATE
		}
	}, {
		classMethods: {
			associate: function(models) {
				Appointment.belongsTo(models.Ticket);
			}
		},
		insanceMethods: {},
		hooks: {}
	});

	return Appointment;
};
