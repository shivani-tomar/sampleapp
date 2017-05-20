//require user model for adding users in database

var User = require('../models/users');

//require error for storing errors
var error = require('./error');

//require bcrypt to encrypt the password
var bcrypt = require('bcryptjs');

//require tv4 for validation of the data
var tv4 = require('tv4');

//require message for the friendly message
var config = require('../config/message');

//salt value use for encyption in bcrypt method
var salt = 10;

//function for adding users

/*
 * @param {object} req
 *
 *@param {object} res
 *
 *
 */

var addUser = function (req, res) {
	

	/**
	 *
	 *defining schema for tv4 validation
	 */
	var uSchema = {
		type: 'object',

		properties: {
			name: { type: 'string', required: ['name'] },
			email: { type: 'string', required: ['email'] },
			password: { type: 'string', required: ['password'] },
			dob: { type: 'string', format: 'date', required: ['dob'] },
			address: { type: 'array', required: ['address'] },
			age: { type: 'number', required: ['age'] },
			gender: { type: 'string', required: ['gender'] },
		},
	};

//adding schema to tv4 format	
	tv4.addSchema('uSchema', uSchema);

//	validating request body with tv4 schema
	var validations = tv4.validateResult(req.body, uSchema);


/**
 *save the data if valid otherwise sending http error-code
 *
 */

	if (validations.valid == false) {
		res.sendStatus(400);
	} else {
		var hashed = bcrypt.hashSync(req.body.password, salt);

		var user = new User();

		user.name = req.body.name;

		user.email = req.body.email;

		user.password = hashed;

		user.dob = req.body.dob;

		user.address = req.body.address;

		user.age = req.body.age;

		user.gender = req.body.gender;

		user.save(function(err) {
			if (err) {
				error.geterror(err);
				res.send({
					message: config.failedToAdd,
				});
			} else {
				res.send({
					message: config.addUser,
				});
			}
		});
	}
};
module.exports = addUser;
