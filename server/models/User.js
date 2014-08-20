'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		uuid: {
			type: DataTypes.UUID,
			unique: true,
			defaultValue: DataTypes.UUIDV1
		},
		username: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true
		},
		hashed_password: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			primaryKey: true,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		provider: {
			type: DataTypes.STRING
		},
		roles: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		isActive: {
			type: DataTypes.BOOLEAN
		}
	}, {
		classMethods: {},
		instanceMethods: {
			authenticate: function(plainText) {
				bcrypt.compare(plainText, this.hashed_password, function(err, res) {
					if (err) {
						throw new Error('Passwords do not match');
					}
					return res;
				});
			},
			getRoles: function() {
				return this.roles;
			},
			addRole: function(role) {
				this.roles.push(role);
				return true;
			},
			removeRole: function(role) {
				var i;
				for (i=0; i<this.roles.length; i++) {
					if (this.roles[i] === role) {
						this.roles.splice(i,1);
						return true;
					}
				}
				throw new Error('Role not found');
			}
		}
	});

	User.hook('afterValidate', function(user, fn) {
		if (!user.changed('hashed_password')) {
			bcrypt.hash(user.hashed_password, 10, function(err, hash) {
				if (err) {
					return fn('Failed to hash password');
				}
				user.hashed_password = hash;
			});
		}
		fn(null, user);
	});

	return User;
};
