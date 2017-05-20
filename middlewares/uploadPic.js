
//requier user model for database
var User = require('../models/users');

/**
 *require error method to store errors
 *
 *@param {string} error
 */
var error = require('./error');

//require multer middleware for file uploading
var multer = require('multer');

//require message from config for user friendly messages
var config = require('../config/message');

/**
 *function to upload the pic of size 1024x1024 ,
 *only png or jpg files,
 *only 12 files 
 *on disk,
 *
 *by  only authenticated user 
 *
 *@param {object} req
 *
 *@param {object} res
 *
 *
 */

var uploadPic = function(req, res) {
	var storage = multer.diskStorage({
		destination: function(req, file, callback) {
			callback(null, './uploads');
		},
		filename: function(req, file, callback) {
			var datetimestamp = Date.now();

			callback(
				null,
				file.originalname +
					'-' +
					datetimestamp +
					'.' +
					file.originalname.split('.')[file.originalname.split('.').length - 1]
			);
		},

		fileFilter: function(req, file, cb) {
			if (
				path.extension(file.originalname) === '.png' ||
				path.extension(file.originalname) === '.jpg'
			) {
				return cb(null, true);
			} else {
				cb(null, false);
			}
		},
	});

	var upload = multer({
		storage: storage,
		limits: {
			fileSize: 1024 * 1024,
		},
	}).array('photos', 12);

	upload(req, res, function(err, result) {
		if (err) {
            return res.send({message:config.error});
		} else {
            res.send({message:config.uploadError});
			var pic = req.files[0];
			User.findByIdAndUpdate(
				req.currUser._id,
				{ $addToSet: { pic: pic.path } },
				function(err) {
					if (err) {
						error.geterror(err);
						console.log(err);
					} else {
                        res.send({message:config.uploadSuccess});
					}
				}
			);
		}
	});
};

module.exports = uploadPic;
