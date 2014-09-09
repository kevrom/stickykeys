'use strict';

module.exports = function(sequelize, DataTypes) {
	var Job = sequelize.define('Job', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		date: {
			type: DataTypes.DATE
		},
		complete: {
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
				Job.belongsTo(models.Customer);
				Job.hasOne(models.Ticket);
			}
		},
		instanceMethods: {}
	});

	return Job;
};
