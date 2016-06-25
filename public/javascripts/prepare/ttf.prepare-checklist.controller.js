(function (ng) {

  var inject = ['$scope', '$compile'];

  function prepareChecklistController($scope, $compile) {
    var _itemCount = 0;
    var _items = [];

    var ctrl = this;

    ctrl.listTitle = $scope.listTitle;

    ctrl.allChecked = false;
    ctrl.checkStateChanged = checkStateChanged;

    ctrl.isEditable = true;
    ctrl.inputBlurred = inputBlurred;
    ctrl.spanFocused = spanFocused;

    ctrl.activate = activate;

    function activate() {
      if (_itemCount) return;

      $scope.$on('check_state_changed_event', onItemCheckStateChanged);
      $scope.$on('add_new_item_event', onAddNewItem);
      $scope.$on('remove_item_event', onRemoveItem);

      onAddNewItem();
    }

    function spanFocused() {
      ctrl.isEditable = true;
    }

    function inputBlurred() {
      ctrl.isEditable = ctrl.listTitle.length === 0;
    }

    function checkStateChanged() {
      $scope.$broadcast('check_all_event', ctrl.allChecked);
    }

    function _findChildItemById(id) {
      return _items.find(function(element) {
        return element.id === id;
      });
    }

    function _findChildItemIndexById(id) {
      return _items.findIndex(function (element) {
        return element.id === id;
      });
    }

    function onItemCheckStateChanged(evt, item) {
      var child = _findChildItemById(item.id);

      if (child) {
        child.isChecked = item.checked;
      }

      ctrl.allChecked = _items.every(function(element) {
        return element.isChecked;
      });
    }

    function onAddNewItem(evt) {
      _items.push({id: ++_itemCount, isChecked: false});
      $scope.tbody.append(
        $compile('<prepare-checklist-item data-item-id="' + _itemCount + '" show-add-new-item="true"></prepare-checklist-item>')($scope)
      );
      $scope.$broadcast('add_new_item_changed_scope_event', _itemCount);
    }

    function onRemoveItem(evt, item) {
      var childIndex = _findChildItemIndexById(item.id);

      if (childIndex !== -1) {
        _items.splice(childIndex, 1);
      }

      $scope.tbody.find('[item-id="' + item.id + '"]').remove();

      ctrl.allChecked = _items.every(function(element) {
        return element.isChecked;
      });
    }
  }

  prepareChecklistController.$inject = inject;

  ng.module('ttfPrepare')
    .controller('PrepareChecklistController', prepareChecklistController);

})(window.angular);