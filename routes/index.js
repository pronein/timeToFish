var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/*', function (req, res) {
  var baseJavascriptsPath = '/javascripts',
    permissions = baseJavascriptsPath + '/admin/permissions',
    roles = baseJavascriptsPath + '/admin/roles',
    auth = baseJavascriptsPath + '/auth',
    aux = {
      compareTo: baseJavascriptsPath + '/auxiliary/compareTo',
      focus: baseJavascriptsPath + '/auxiliary/focus'
    },
    prepare = baseJavascriptsPath + '/prepare',
    menu = baseJavascriptsPath + '/menu',
    user = baseJavascriptsPath + '/user',
    members = baseJavascriptsPath + '/admin/members';

  res.render('index', {
    title: 'Time To Fish',
    styles: [
      '/stylesheets/main.css',
      'https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css'
    ],
    scripts: [
      baseJavascriptsPath + '/ttf.app.module.js',
      baseJavascriptsPath + '/ttf.app.config.js',
      baseJavascriptsPath + '/ttf.rest-base.provider.js',
      baseJavascriptsPath + '/ttf.user.service.js',
      user + '/ttf.user.module.js',
      user + '/ttf.user.config.js',
      user + '/ttf.user-register.controller.js',
      user + '/ttf.user-register.directive.js',
      user + '/username/ttf.username-validation.directive.js',
      menu + '/ttf.menu.controller.js',
      prepare + '/ttf.prepare.module.js',
      prepare + '/ttf.prepare.config.js',
      prepare + '/ttf.prepare.directive.js',
      prepare + '/ttf.prepare.controller.js',
      prepare + '/ttf.prepare-checklist.controller.js',
      prepare + '/ttf.prepare-checklist.directive.js',
      prepare + '/ttf.prepare-checklist-item.controller.js',
      prepare + '/ttf.prepare-checklist-item.directive.js',
      prepare + '/ttf.user-checklists.controller.js',
      prepare + '/ttf.user-checklists.directive.js',
      aux.compareTo + '/ttf.compare-to.directive.js',
      aux.focus + '/ttf.focus.service.js',
      aux.focus + '/ttf.focus-on-events.directive.js',
      auth + '/ttf.session.module.js',
      auth + '/ttf.session-profile.controller.js',
      auth + '/ttf.session-profile.directive.js',
      roles + '/ttf.roles.module.js',
      roles + '/ttf.roles.config.js',
      roles + '/ttf.roles.service.js',
      roles + '/ttf.roles.controller.js',
      roles + '/ttf.roles.directive.js',
      permissions + '/ttf.permissions.module.js',
      permissions + '/ttf.permissions.controller.js',
      permissions + '/ttf.permissions.service.js',
      permissions + '/ttf.permissions.directive.js',
      permissions + '/ttf.permissions-selector.controller.js',
      permissions + '/ttf.permissions-selector.directive.js',
      members + '/ttf.members.module.js',
      members + '/ttf.members.service.js',
      members + '/ttf.members-selector.controller.js',
      members + '/ttf.members-selector.directive.js'
    ]
  });
});

module.exports = router;
