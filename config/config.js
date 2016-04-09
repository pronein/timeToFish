var configPath = './env/' + process.env.NODE_ENV + '.js';

module.exports = require(configPath);