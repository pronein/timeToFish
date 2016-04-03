var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Time To Fish',
    javascripts: [
      '/bower_components/jquery/dist/jquery.js',
      '/bower_components/angular/angular.js',
      '/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js'
    ],
    angularAppScripts: [
      '/javascripts/ttf.app.module.js',
      '/javascripts/auth/ttf.session.module.js',
      '/javascripts/auth/ttf.session-profile.controller.js',
      '/javascripts/auth/ttf.session-profile.directive.js'
    ],
    styles: [
      '/stylesheets/style.css'
    ]
  });
});

module.exports = router;
