'use strict';

/*
	UserProfile is used for information related the individual that owns User.
	Personal information, flags, and things that aren't related to
	the actual account of the User should be stored here.  Nothing here is 
	necessary to being a user.
*/
module.exports = function(sequelize, DataTypes) {
	var UserProfile = sequelize.define('UserProfile', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		phone: {
			type: DataTypes.STRING
		},
		allowPush: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		allowText: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		classMethods: {
			associate: function(models) {
				UserProfile.hasOne(models.User);
			}
		},
		instanceMethods: {}
	});

	return UserProfile;
};
