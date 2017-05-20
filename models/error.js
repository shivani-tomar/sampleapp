var mongoose = require('mongoose')

//defining model for error

var errorSchema = new mongoose.Schema({

    error: { type: String }

})

module.exports = mongoose.model('error', errorSchema)