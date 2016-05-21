(function (ng) {

  var inject = ['$scope'];

  function prepareChecklistItemController($scope) {
    var ctrl = this;

    ctrl.id = $scope.itemId;
    ctrl.showAddNewItem = $scope.showAddNewItem || false;
    ctrl.addItemClicked = addItemClicked;
    ctrl.addItemKeyDown = addItemKeyDown;

    ctrl.removeItemClicked = removeItemClicked;

    ctrl.checked = false;
    ctrl.checkStateChanged = checkStateChanged;

    ctrl.isEditable = true;
    ctrl.shrinkLabel = false;
    ctrl.itemText = '';
    ctrl.inputFocused = inputFocused;
    ctrl.inputBlurred = inputBlurred;
    ctrl.spanFocused = spanFocused;

    activate();

    function activate() {
      $scope.$on('check_all_event', onCheckAllChanged);
      $scope.$on('add_new_item_changed_scope_event', onAddNewItemChanged);
    }
    
    function onAddNewItemChanged(evt, addNewItemId) {
      $scope.showAddNewItem = ctrl.showAddNewItem = ctrl.id === addNewItemId;
    }
    
    function onCheckAllChanged(evt, isChecked) {
      ctrl.checked = isChecked;
    }

    function checkStateChanged() {
      $scope.$emit('check_state_changed_event', {
        id: ctrl.id,
        checked: ctrl.checked
      });
    }

    function spanFocused() {
      ctrl.isEditable = true;
    }

    function inputFocused() {
      ctrl.shrinkLabel = true;
    }

    function inputBlurred() {
      ctrl.shrinkLabel = false;
      ctrl.isEditable = ctrl.itemText.length === 0;
    }

    function addItemClicked() {
      $scope.$emit('add_new_item_event');
    }

    function addItemKeyDown(event){
      if (event.keyCode === 9 && !event.shiftKey) //TAB but not cycling backwards (shift + tab)
        $scope.$emit('add_new_item_event');
    }

    function removeItemClicked() {
      $scope.$emit('remove_item_event', {id: ctrl.id});
    }
  }

  prepareChecklistItemController.$inject = inject;

  ng.module('ttfPrepare')
    .controller('PrepareChecklistItemController', prepareChecklistItemController);

})(window.angular);