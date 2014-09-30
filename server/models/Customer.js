'use strict';

module.exports = function(sequelize, DataTypes) {
	var Customer = sequelize.define('Customer', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		business: {
			type: DataTypes.STRING
		},
		address: {
			type: DataTypes.STRING
		},
		city: {
			type: DataTypes.STRING
		},
		state: {
			type: DataTypes.STRING
		},
		zipCode: {
			type: DataTypes.STRING
		},
		phonePrimary: {
			type: DataTypes.STRING
		},
		phoneSeconday: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				isEmail: true
			}
		},
		referredBy: {
			type: DataTypes.STRING
		},
		notes: {
			type: DataTypes.TEXT
		}
	}, {
		classMethods: {
			associate: function(models) {
				Customer.hasMany(models.Ticket);
			}
		},
		instanceMethods: {},
		getterMethods: {
			fullName: function() {
				return this.firstName + ' ' + this.lastName;
			}
		}
	});

	return Customer;
};
