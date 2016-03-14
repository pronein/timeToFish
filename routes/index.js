var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Time To Fish',
    javascripts: ['/bower_components/angular/angular.js'],
    angularAppScripts: [],
    styles: ['/stylesheets/style.css']
  });
});

module.exports = router;
