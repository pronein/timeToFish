var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * Model Definition
 */

var PermissionSchema = new Schema({
  name: String,
  description: String,
  category: {type: String, lowercase: true}
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

mongoose.model('Permission', PermissionSchema);

/*
 * Internals
 */
