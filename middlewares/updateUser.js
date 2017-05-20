//require user model for databse
var User = require('../models/users');

/**
 *error method to store errors
 *@param {string} error
 *
 */
var error = require('./error');
/**
 *
 *require message from config for user friendly messages
 */
var config = require('../config/message');

/**
 *
 * function to update user's information in the
 *database on the basis of _id if valid
 *
 *@param {object} req
 *@param {object} res
 *
 *@body {string} _id
 *
 */

var updateUser = function(req, res) {
	var uid;
	if (req.params.id || req.query.id || req.body.id) {
		uid = req.params.id || req.query.id || req.body.id;

		User.findOne({ _id: uid }, function(err, user) {
			if (err) {
				error.geterror(err);
				res.send({ message: config.error });
			} else if (!user) {
				var err = { message: config.userNotFound };
				error.geterror(err);
				res.send(err);
			} else if (user) {
				user.name = req.body.name;
				user.email = req.body.email;
				user.password = req.body.password;
				user.dob = req.body.dob;
				user.address = req.body.address;
				user.age = req.body.age;
				user.gender = req.body.gender;

				user.save(function(err) {
					if (err) {
						error.geterror(err);
						res.send(err);
					} else {
						res.send({ message: config.updateUser });
					}
				});
			}
		});
	} else {
		var err = { message: config.noUserId };
		error.geterror(err);
		res.send(err);
	}
};

module.exports = updateUser;
