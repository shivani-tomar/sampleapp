/**
 *indexing for routing the middlewares
 *
 *
 */

exports.addUser = require('./addUser');
exports.findAllUsers = require('./findAllUsers');
exports.forgotPassword = require('./forgotPassword');
exports.login = require('./login');
exports.removeUser = require('./removeUser');
exports.updateUser = require('./updateUser');
exports.uploadPic = require('./uploadPic');
exports.verifyToken = require('./verifyToken');
exports.viewPics = require('./viewPics');

exports.index = function(req, res) {
	res.send('welcome to hell');
};
