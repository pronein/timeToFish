var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function (req, res) {
  res.render('index', {
    title: 'Time To Fish',
    javascripts: [
      '/bower_components/jquery/dist/jquery.js',
      '/bower_components/angular/angular.js',
      '/bower_components/angular-ui-router/release/angular-ui-router.js',
      '/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      '/bower_components/angular-environment/dist/angular-environment.js',
      '/bower_components/moment/moment.js'
    ],
    angularAppScripts: [
      '/javascripts/ttf.app.module.js',
      '/javascripts/ttf.app.config.js',

      '/javascripts/auth/ttf.session.module.js',
      '/javascripts/auth/ttf.session-profile.controller.js',
      '/javascripts/auth/ttf.session-profile.directive.js',

      '/javascripts/ttf.rest-base.provider.js',
      '/javascripts/ttf.user.service.js',

      '/javascripts/menu/ttf.menu.controller.js',

      '/javascripts/prepare/ttf.prepare.module.js',
      '/javascripts/prepare/ttf.prepare.config.js',
      '/javascripts/prepare/ttf.prepare.controller.js',
      '/javascripts/prepare/ttf.prepare.directive.js',
      '/javascripts/prepare/ttf.user-checklists.controller.js',
      '/javascripts/prepare/ttf.user-checklists.directive.js'
    ],
    styles: [
      '/stylesheets/main.css',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'
    ]
  });
});

module.exports = router;
