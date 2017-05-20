
//require jwt for token generation and validaton
var jwt = require('jsonwebtoken');

/**
 *require error method to store errors
 *
 *@param {string} error
 */
var error = require('./error');

//require user model for database
var User = require('../models/users');

//require message from config for user friendly messages
var config = require('../config/message');

//require config for secret key for jwt
var secret = require('../config/config');



/**
 *
 *function to verify token 
 *
 *for the validation of current logged in User
 *
 *@param {object} req
 *
 *@param {object} res
 *
 *@param next  to call  next middleware
 */
var verifyToken = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['token'];
	if (token) {
		jwt.verify(token, secret.secret, function(err, currUser) {
			if (err) {
				error.geterror(err);
				res.send(config.error);
			} else {
				req.currUser = currUser._doc;
				console.log('user is verified');
				next();
			}
		});
	} else {
		res.send({ error: '401', message: config.noToken });
	}
};
module.exports = verifyToken;
