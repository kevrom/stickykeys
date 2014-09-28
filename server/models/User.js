'use strict';

var bluebird = require('bluebird');
var bcrypt   = require('bcrypt');
var hash     = bluebird.promisify(bcrypt.hash);

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
		hashedPassword: {
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
		roles: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {},
		instanceMethods: {
			authenticate: function(plainText, cb) {
				bcrypt.compare(plainText, this.hashedPassword, function(err, res) {
					return cb(err, res);
				});
			},
			hashPassword: function(plainText, cb) {
				var self = this;
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(plainText, salt);
				self.hashedPassword = hash;
				return self;
			},
			getRoles: function() {
				return this.roles;
			},
			hasRole: function(role) {
				var i;
				for (i=0; i<this.roles.length; i++) {
					if (this.roles[i] === role) {
						return true;
					}
				}
				return false;
			},
			addRole: function(role) {
				if (this.hasRole(role)) {
					throw new Error('User already has this role.');
				} else {
					this.roles.push(role);
					return true;
				}
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

	return User;
};
