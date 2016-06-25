(function (ng) {

  var inject = ['permissionsService', '$timeout'];

  function PermissionsController(permissionsService, $timeout) {
    var ctrl = this;

    ctrl.vm = permissionsService.data;

    ctrl.vm.show = {
      removeSuccess: false,
      removeFailed: false,
      insertSuccess: false,
      insertFailed: false
    };

    ctrl.vm.new = {
      name: '',
      description: '',
      category: ''
    };

    ctrl.toggleCategory = toggleCategory;
    ctrl.addNewPermission = addNewPermission;
    ctrl.removePermission = removePermission;

    function toggleCategory(event) {
      ng.element(event.target).toggleClass('badge-primary');

      _filterPermissionsByCategories();
    }

    function _filterPermissionsByCategories() {
      var selectedCategories = ng.element('.badge.badge-primary');
      selectedCategories = selectedCategories.toArray()
        .map(function (elem) {
          return elem.innerText;
        });

      permissionsService.loadPermissions(selectedCategories);
    }

    function _resetNewPermissionForm() {
      ctrl.vm.new.name = '';
      ctrl.vm.new.description = '';
      ctrl.vm.new.category = '';

      ng.element('#name').focus();
    }

    function _showOperationStatusMessage(showProperty) {
      var ctrl = this;
      ctrl.vm.show[showProperty] = true;

      $timeout(function () {
        ctrl.vm.show[showProperty] = false;
      }, 4000);
    }

    function addNewPermission(form) {
      if (form.$valid) {
        permissionsService.addPermission(ctrl.vm.new)
          .then(function () {
            _showOperationStatusMessage.call(ctrl, 'insertSuccess');

            _resetNewPermissionForm();
          })
          .catch(function () {
            _showOperationStatusMessage.call(ctrl, 'insertFailed');
          });
      }
    }

    function removePermission(permission) {
      permissionsService.removePermission(permission.name)
        .then(function () {
          _showOperationStatusMessage.call(ctrl, 'removeSuccess');
        })
        .catch(function () {
          _showOperationStatusMessage.call(ctrl, 'removeFailed');
        });
    }
  }

  PermissionsController.$inject = inject;

  ng.module('ttfPermissions')
    .controller('PermissionsController', PermissionsController);

})(window.angular);