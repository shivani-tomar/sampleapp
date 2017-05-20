
//require mongoose  an orm for database
var mongoose = require('mongoose')

/**
 *
 *defining user schema 
 *@param {object}
 */

var userSchema = new mongoose.Schema({

  name: { type: String },
  email: { type: String },
  password: { type: String, minLength: 6 },
  dob: { type: Date, default: Date.now },
  address: { type: Array },
  age: { type: Number },
  gender: { type: String },
  pic: { type: [String] }
 

})

module.exports = mongoose.model('User', userSchema)
