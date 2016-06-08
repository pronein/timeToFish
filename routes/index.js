var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function (req, res) {
  res.render('index', {
    title: 'Time To Fish',
    styles: [
      '/stylesheets/main.css',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'
    ]
  });
});

module.exports = router;
