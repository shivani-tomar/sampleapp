
//require user model for database
var User = require('../models/users');


//require jwt to generate token and verification of token
var jwt = require('jsonwebtoken');

//require secret key from config for encryption and validation of token
var secret = require('../config/config');

//require bcrypt to encrypt password
var bcrypt = require('bcryptjs');

//require tv4 for validation of data
var tv4 = require('tv4');

//require message from config for user friendly json messages
var config = require('../config/message');

/**
 *
 *function for logging in for the authenticated user 
 *and generate token for the user
 *
 *@param  {object } req
 *@param {object}  res
 */

var login = function (req, res) {
	
	//defining schema for tv4
	var lSchema = {
		type: 'object',

		properties: {
			email: { type: 'string', required: ['email'] },
			password: { type: 'string', required: ['password'] },
		},
	};

	// adding schema to tv4
	tv4.addSchema('lSchema', lSchema);

	// validating data with tv4 format	
	var validations = tv4.validateResult(req.body, lSchema, false);

	if (validations.valid == false) {
		res.sendStatus(400);
	} else {
		User.findOne({ email: req.body.email }, function(err, user) {
			if (err) {
				error.geterror(err);
				res.send({ message: config.error });
			} else if (
				!user || !bcrypt.compareSync(req.body.password, user.password)
			) {
				res.sendStatus(401);
			} else {
				var token = jwt.sign(user, secret.secret, {
					expiresIn: 24 * 60 * 60,
				});
				res.json({
					success: true,
					message: config.tokenGenerate,
					token: token,
					currentUserEmail: user.email,
				});
			}
		});
	}
};

module.exports = login;
