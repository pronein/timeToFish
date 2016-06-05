var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * Model Definition
 */

var RoleSchema = new Schema({
  name: String,
  description: String,
  permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}]
});

/*
 * Indexes
 */

/*
 * Statics
 */

/*
 * Register Model
 */

mongoose.model('Role', RoleSchema);

/*
 * Internals
 */
