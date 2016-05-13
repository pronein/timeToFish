var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  name: String,
  description: String,
  category: String
});

mongoose.model('Permission', PermissionSchema);
