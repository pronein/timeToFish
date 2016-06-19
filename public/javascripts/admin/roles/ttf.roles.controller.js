(function (ng, ss) {

  var inject = ['permissionsService', 'rolesService', '$stateParams'];

  function RolesController(permissionsService, rolesService, $stateParams) {
    var ctrl = this,
      _editorMode = ctrl.modes.add,
      _submissionType = ctrl.submitTypes.none;

    ctrl.vm = {
      permData: permissionsService.data,
      roleData: rolesService.data
    };

    ctrl.isEditing = isEditing;
    ctrl.setMode = setMode;
    ctrl.submitForm = submitForm;
    ctrl.setSubmissionType = setSubmissionType;

    _activate();

    function _activate() {
      console.log('Activating RolesController...');
      if ($stateParams.roleName) {
        rolesService.loadRoleByName($stateParams.roleName);
      }
    }

    function isEditing() {
      return _editorMode === ctrl.modes.update;
    }

    function setMode(mode) {
      if (typeof mode === 'string') _editorMode = ctrl.modes[mode] || ctrl.modes.default;
      else if (typeof mode === 'number') {
        mode = parseInt(mode);

        _editorMode =
          mode > ctrl.modes.none && mode < ctrl.modes.invalid
            ? mode
            : ctrl.modes.default;
      }
    }

    function setSubmissionType(type) {
      if (typeof type === 'string') _submissionType = ctrl.submitTypes[type] || ctrl.submitTypes.default;
      else if (typeof type === 'number') {
        type = parseInt(type);

        _submissionType =
          type > ctrl.submitTypes.none && type < ctrl.submitTypes.invalid
            ? type
            : ctrl.submitTypes.default;
      }
    }

    function submitForm(isFormValid) {
      console.log('form submittal: ');
      console.log('  > valid form: ' + isFormValid.toString());
      console.log('  > submission: ' + ss.getPropNameByVal(ctrl.submitTypes, _submissionType));

      switch (_submissionType) {
        case ctrl.submitTypes.add:
          if (isFormValid && !ctrl.isEditing()) _addNewRole();
          break;

        case ctrl.submitTypes.cancel:
          _cancelRoleModifications();
          break;

        case ctrl.submitTypes.remove:
          if (ctrl.isEditing()) _removeRole();
          break;

        case ctrl.submitTypes.update:
          if (isFormValid && ctrl.isEditing()) _updateRole();
          break;

        default:
          console.warn('Invalid role form submission type.');
          break;
      }
    }

    function _addNewRole() {
      rolesService.addNewRole();
    }

    function _cancelRoleModifications() {

    }

    function _removeRole() {
      rolesService.removeRole();
    }

    function _updateRole() {
      rolesService.updateRole();
    }
  }

  RolesController.prototype.modes = {
    none: 0,
    default: 1,
    add: 1,
    update: 2,
    invalid: 3 //must always be the greatest number (cannot skip any numbers)
  };

  RolesController.prototype.submitTypes = {
    none: 0,
    default: 0,
    add: 1,
    update: 2,
    remove: 3,
    cancel: 4,
    invalid: 5 //must always be the greatest number (cannot skip any numbers)
  };

  RolesController.$inject = inject;

  ng.module('ttfRoles')
    .controller('RolesController', RolesController);

})(window.angular, window.schradersoft);