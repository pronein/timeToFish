var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');
var MenuItem = mongoose.model('MenuItem');

var UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  middleName: String,
  passwordHash: String,
  email: String,
  roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
});

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

UserSchema.pre('save', pre_save);

UserSchema.statics.usernameExists = usernameExists;

mongoose.model('User', UserSchema);

function pre_save(next) {
  this.email = this.email.toLowerCase();
  next();
}

function usernameExists(username, callback) {
  return this.findOne({
    username: new RegExp('^' + username + '$', 'i')
  }, function(err, user) {
    callback(err, user ? true : false);
  });
}