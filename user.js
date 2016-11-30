var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({

  name: { type: String },
  email: { type: String },
  city: { type: String },
  customCity:{ type: String },
  university: { type: String },
  customUniversity:{ type: String },
  major: { type: String },
  bribeyes: { type: String },
  forcedyes: { type: String },
  bribeother: { type: String },
  subject: { type: String },
  department: { type: String },
  official: { type: String },
  officialName: { type: String },
  amount: { type: String },
  size: { type: Number },
  date: {type: String }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
