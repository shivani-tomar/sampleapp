//require user model for the database
var User = require('../models/users');
/**
 *require error method to store errors
 *@param {string} error
 *@
 */
var error = require('./error');

// require generator method to generate password randomly
var generator = require('generate-password');

//require bcrypt method to encrypt the password
var bcrypt = require('bcryptjs');

//require tv4 metod for validation of data send by user
var tv4 = require('tv4');

//require nodemailer to send mail to the user for sending password
var nodemailer = require('nodemailer');

//require message from config for user friendly messages
var config = require('../config/message');

//salt value used in bcrypt method to ecrypt password
var salt = 10;

/**
 *
 *function to send randomly generated new password 
 *to user through mail and saving it to the database
 *if user is valid
 *otherwise sending http error code for unautherised access
 *
 *@param {object} request
 *@param {object} response
 *
 */

var forgotPassword = function(req, res) {
	//defining schema for validation
	var fSchema = {
		type: 'object',

		properties: {
			email: { type: 'string', required: ['email'] },
		},
	};

	//adding schema to tv4 format
	tv4.addSchema('fSchema', fSchema);

	// validating data to tv4 schema
	var validations = tv4.validateResult(req.body, fSchema, false);

	if (validations.valid == false) {
		res.sendStatus(400);
	} else {
		User.findOne({ email: req.body.email }, function(err, user) {
			if (err) {
				error.geterror(err);
				res.send(err);
			} else if (!user) {
				res.sendStatus(401);
			} else {
				var password = generator.generate({
					length: 10,
					numbers: true,
				});

				/**
 *
 * nodemailer to send mail from autherized user to the user whose password it updated in database
 *
 *
 *
 */

				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: '',
						pass: '',
					},

					tls: {
						// do not fail on invalid certs
						rejectUnauthorized: false,
					},
				});

				var mailOptions = {
					from: 'shivanitomar1995@gmail.com',
					to: req.body.email,
					subject: 'Reset Password',
					text: 'your new password is ' + password,
				};

				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						console.log(error);
					} else {
						res.send({ message: config.sendEmail });
					}
				});

				var hashed = bcrypt.hashSync(password, salt);

				//updating password in database

				User.findByIdAndUpdate(
					{ _id: user.id },
					{ $set: { password: hashed } },
					function(err) {
						if (err) {
							error.geterror(err);
							console.log(err);
						}
					}
				);
			}
		});
	}
};

module.exports = forgotPassword;
