(function (ng) {

  var inject = ['permissionsService', 'rolesService'];

  function PermissionsSelectorController(permissionsService, rolesService) {
    var ctrl = this;

    ctrl.vm = {
      categories: [],
      permissions: [],
      selectedCategory: '',
      selectedPermissions: rolesService.data.permissions
    };

    ctrl.isSelectedCategory = isSelectedCategory;
    ctrl.isPermissionChecked = isPermissionChecked;
    
    ctrl.getOddPermissions = getOddPermissions;
    ctrl.getEvenPermissions = getEvenPermissions;
    
    ctrl.onPermissionClicked = onPermissionClicked;

    _activate();

    function _activate() {
      permissionsService.loadPermissions()
        .then(function () {
          ctrl.vm.categories = permissionsService.data.categories;
          ctrl.vm.permissions = permissionsService.data.permissions;
          ctrl.vm.selectedCategory = ctrl.vm.categories[0];
        });
    }

    function isSelectedCategory(category) {
      return ctrl.vm.selectedCategory === category;
    }
    
    function isPermissionChecked(permissionName) {
      return ctrl.vm.selectedPermissions.indexOf(permissionName) !== -1;
    }

    function getOddPermissions(category) {
      var keepPermission = false;
      return ctrl.vm.permissions.filter(function (permission) {
        if(permission.category === category) {
          keepPermission = !keepPermission;
          return keepPermission;
        }

        return false;
      });
    }

    function getEvenPermissions(category) {
      var keepPermission = true;
      return ctrl.vm.permissions.filter(function (permission) {
        if(permission.category === category) {
          keepPermission = !keepPermission;
          return keepPermission;
        }

        return false;
      });
    }
    
    function onPermissionClicked($event) {
      var target = $event.target,
        idx = ctrl.vm.selectedPermissions.indexOf(target.id),
        isChecked = target.checked;

      if(isChecked && idx === -1) {
        ctrl.vm.selectedPermissions.push(target.id);
      } else if(!isChecked && idx !== -1){
        ctrl.vm.selectedPermissions.splice(idx, 1);
      }

      console.log('Selected permissions for current role: ' + ctrl.vm.selectedPermissions.join(', '));
    }
  }

  PermissionsSelectorController.$inject = inject;

  ng.module('ttfRoles')
    .controller('PermissionsSelectorController', PermissionsSelectorController);

})(window.angular);