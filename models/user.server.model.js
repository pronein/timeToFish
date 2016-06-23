var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

UserSchema.set('toJSON', {virtuals: true});

/*
 * Indexes
 */

UserSchema.index({username: 1}, {unique: true});
UserSchema.index({email: 1}, {unique: true});

/*
 * Virtuals
 */

UserSchema.virtual('name.full').get(function () {
  return _toPascalCase(this.name.first) +
    (this.name.middle ? ' ' + _toPascalCase(this.name.middle[0]) + '. ' : ' ') +
    _toPascalCase(this.name.last);
});

/*
 * Statics
 */

UserSchema.statics.usernameExists = usernameExists;
UserSchema.statics.removeRoleFromAll = removeRoleFromAllUsers;
UserSchema.statics.addRoleToMembers = addRoleToMembers;

/*
 * Register Model
 */

mongoose.model('User', UserSchema);

/*
 * Internals
 */

function usernameExists(username, callback) {
  return this.findOne({
    username: new RegExp('^' + username + '$', 'i')
  }, function (err, user) {
    callback(err, user ? true : false);
  });
}

function _toPascalCase(word) {
  if (!word || !word.length) return word;
  if (word.length === 1) return word.toUpperCase();

  return word[0].toUpperCase() + word.substr(1);
}

function removeRoleFromAllUsers(role, callback) {
  var criteria = {
    roles: role.id
  }, statement = {
    $pull: {roles: role.id}
  };

  this.update(criteria, statement, {multi: true}, callback);
}

function addRoleToMembers(role, members, callback) {
  var criteria = {
    _id: {
      $in: members.map(function (member) {
        return member.id;
      })
    }
  }, statement = {
    $addToSet: {roles: role.id}
  };

  this.update(criteria, statement, {multi: true}, callback);
}