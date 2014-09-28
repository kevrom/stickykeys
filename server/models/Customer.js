'use strict';

module.exports = function(sequelize, DataTypes) {
	var Customer = sequelize.define('Customer', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
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
		zip_code: {
			type: DataTypes.STRING
		},
		phone_primary: {
			type: DataTypes.STRING
		},
		phone_seconday: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				isEmail: true
			}
		},
		referred_by: {
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
			full_name: function() {
				return this.first_name + ' ' + this.last_name;
			}
		}
	});

	return Customer;
};
