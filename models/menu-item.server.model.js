var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
  menuId: Number,
  permissionRequired: {type: Schema.Types.ObjectId, ref: 'Permission'},
  name: {
    state: String,
    display: String
  },
  owner: String
}, {collection: 'menuItems'});

mongoose.model('MenuItem', MenuItemSchema);
