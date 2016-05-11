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

UserSchema.post('findById', post_load);
UserSchema.post('findOne', post_load);

mongoose.model('User', UserSchema);

function pre_save(next) {
  this.email = this.email.toLowerCase();
  next();
}

function post_load(user) {
  if (user) {
  }
}
