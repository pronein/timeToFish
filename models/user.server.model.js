var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  middleName: String,
  passwordHash: String,
  email: String
});

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

UserSchema.pre('save', pre_save);

mongoose.model('User', UserSchema);

function pre_save(next){
  this.email = this.email.toLowerCase();
  next();
}