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
  }
};