crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		username: DataTypes.STRING,
		hashed_password: DataTypes.STRING,
		name: DataTypes.STRING,
		email: DataTypes.STRING,
		provider: DataTypes.STRING,
		salt: DataTypes.STRING,
		roles: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN
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
				for (var i=0; i<10; i++) {
					var p = Math.floor(Math.random() * set.length);
					salt += set[p];
				}
				return salt;
			},
			setPassword: function(password) {
				this._password = password;
				this.salt = this.makeSalt();
				this.hashed_password = this.encryptPassword(password);
			}
		}
	});

	return User;
}
