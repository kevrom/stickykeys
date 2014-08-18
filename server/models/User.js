'use strict';

var crypto = require('crypto');

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
			validate: {
				isEmail: true
			}
		},
		provider: {
			type: DataTypes.STRING
		},
		salt: {
			type: DataTypes.STRING
		},
		roles: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		},
		isActive: {
			type: DataTypes.BOOLEAN
		}
	}, {
		_password: '',
		classMethods: {},
		instanceMethods: {
			authenticate: function(plainText) {
				return this.encryptPassword(plainText) === this.hashed_password;
			},
			encryptPassword: function(password) {
				return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
			},
			getPassword: function() {
				return this._password;
			},
			makeSalt: function() {
				var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
				var salt = '';
				var i,p;
				for (i=0; i<10; i++) {
					p = Math.floor(Math.random() * set.length);
					salt += set[p];
				}
				return salt;
			},
			setPassword: function(password) {
				this._password = password;
				this.salt = this.makeSalt();
				this.hashed_password = this.encryptPassword(password);
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

	return User;
};
