
// require user model for database connection
var User = require('../models/users');

/**
 *require error method to store errors
 *
 *@param {string} error
 */
var error = require('./error');

//require message from config for user friendly messages
var config = require('../config/message');


/**
 *function to send pics for the view to the authenticated user
 *@param {object} req
 *@param {object} res
 *
 */
var viewPics = function(req, res) {
	var email = req.currUser.email;
	User.findOne({ email: email }, 'pic', function(err, user) {
		if (err) {
			res.send({ message: config.error });
		} else {
			res.send(user.pic);
			console.log('data fetched');
		}
	}).limit(2);
};

module.exports = viewPics;
