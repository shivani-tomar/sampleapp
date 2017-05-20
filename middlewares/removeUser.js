
//require user model for the database operations
var User = require('../models/users');

/**
 *require error method to store errors in database
 *
 *@param {string} error
 */
var error = require('./error');


//require message from config  for user friendly messages
var config = require('../config/message');

/**
 * function to remove the user information from the database
 *on the basis of user id provided in the request body if valid
 *
 *@param {object} req
 *
 *@param {object} res
 *
 *
 */
var removeUser = function(req, res) {
	var uid;
	if (req.params.id || req.query.id || req.body.id) {
		uid = req.params.id || req.query.id || req.body.id;

		User.findOneAndRemove({ _id: uid }, function(err, user) {
			if (err) {
				error.geterror(err);
				res.send({ message: config.error });
			} else {
				res.send({ message: config.removeUser });
			}
		});
	} else {
		res.sendStatus(400);
	}
};

module.exports = removeUser;
