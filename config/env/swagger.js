module.exports = {
  db: 'mongodb://localhost:27017/time_to_fish',
  bunyan: {
    useSource: true,
    streams: [{
      path: './logs/dev.log'
    },{
      stream: process.stdout,
      level: 'trace'
    }]
  },
  crypto: {
    digest: 'sha256',
    saltLen: 256,
    keyLen: 256,
    stretch: 1000
  },
  isDebugBuild: true,
  port: 3010
};