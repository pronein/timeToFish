var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  name: String,
  permissions: [{type: Schema.Types.ObjectId, ref: 'Permission'}]
});

mongoose.model('Role', RoleSchema);
