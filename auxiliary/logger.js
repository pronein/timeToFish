var config = require('../config/config');
var bunyan = require('bunyan');

var logger = bunyan.createLogger({
  name: 'ttfLog',
  streams: config.bunyan.streams,
  serializers: bunyan.stdSerializers, //gives us req, res & err
  src: config.bunyan.useSource
});

module.exports = logger;