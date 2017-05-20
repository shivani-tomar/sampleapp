var errorModel = require('../models/error');

//function to store errors in database

exports.geterror = function(errr) {
	var logerr = new errorModel();
	logerr.error = JSON.stringify(errr);
	logerr.save(function(err, succ) {
		if (err) console.log(err);
		console.log('error is saved');
	});
};
