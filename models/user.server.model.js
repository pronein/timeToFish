var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');
var MenuItem = mongoose.model('MenuItem');

/*
 * Model Definition
 */

var UserSchema = new Schema({
  username: String,
  email: {type: String, lowercase: true},
  name: {
    first: String,
    middle: String,
    last: String
  },
  password: {
    salt: String,
    hash: String
  },
  roles: [{type: Schema.Types.ObjectId, ref: 'Role'}]
});

/*
 * Indexes
 */

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

/*
 * Statics
 */

UserSchema.statics.usernameExists = _usernameExists;

/*
 * Register Model
 */

mongoose.model('User', UserSchema);

/*
 * Internals
 */

function _usernameExists(username, callback) {
  return this.findOne({
    username: new RegExp('^' + username + '$', 'i')
  }, function (err, user) {
    callback(err, user ? true : false);
  });
}