// require user model for finding users in database
var User = require('../models/users');

/**
 *
 * error method to capture error
 * @param {string} error
 */
var error = require('./error');

//require message for config for the user friendly messages
var config = require('../config/message');

//require url for parsing request url
const url = require('url');

/**
 *function to find user from database on the basis of
 *  request queries like filtering ,sorting ,pagination etc
 *  provided by client if user is valid otherwise sending friendly message
 *@param {Object} request
 *
 *@param {Object}response
 */
var findAllUsers = function(req, res) {
	var searchObj = {};
	var sort = {};
	var page;

	var queryData = url.parse(req.url, true).query;

	if (queryData.name && queryData.email) {
		searchObj.name = queryData.name;
		searchObj.email = queryData.email;
	} else if (queryData.name && queryData.email) {
		searchObj.email = queryData.email;
	} else if (queryData.name && !queryData.email) {
		searchObj.name = queryData.name;
	} else {
		searchObj = {};
	}

	if (queryData.sort) {
		sort[queryData.sort] = 1;
	} else {
		sort[User.name] = 1;
	}
	if (queryData.page) {
		page = queryData.page;
	} else {
		page = 0;
	}
	User.find(searchObj)
		.sort(queryData.sort)
		.limit(page)
		.exec(function(err, user) {
			if (err) {
				error.geterror(err);
				res.send(err).end();
			} else if (!user.length) {
				var err = { message: config.userNotFound };
				res.send(err);
			} else {
				res.send(user);
			}
		});
};

module.exports = findAllUsers;
