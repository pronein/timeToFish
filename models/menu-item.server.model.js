var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * Model Definition
 */

var MenuItemSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  parent: {type: Schema.Types.ObjectId, ref: 'MenuItem', default: null},
  permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}],
  key: {type: String, required: true, lowercase: true, trim: true, set: replaceSpaces},
  sequence: {type: Number, default: 10, required: true, set: integerOnly},
  state: {type: String, trim: true}
}, {collection: 'menuItems'});

MenuItemSchema.set('toJSON', {virtuals: true, transform: _transformForJson});
/*
 * Indexes
 */

MenuItemSchema.index({key: 1});

/*
 * Register Model
 */

mongoose.model('MenuItem', MenuItemSchema);

/*
 * Internals
 */

function _transformForJson(doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
}

function integerOnly(val) {
  if (typeof val === 'number') {
    return parseInt(val);
  }

  return val;
}

function replaceSpaces(val) {
  if (typeof val === 'string') {
    return val.replace(/\s+/g, '_');
  }
}