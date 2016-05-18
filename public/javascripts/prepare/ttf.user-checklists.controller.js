(function (ng) {

  var inject = ['userService'];

  function userChecklistsController(userService) {
    var ctrl = this;
    
    ctrl.lists = [];
    
    init();
    
    function init() {
      
    }
    
    
  }

  userChecklistsController.$inject = inject;

  ng.module('ttfPrepare')
    .controller('UserChecklistsController', userChecklistsController);

})(window.angular);

function onAnchorRemoveKeydown(evt) {
  if ((evt.keyCode || evt.which) === 9 && // Tab key === 9
    !evt.shiftKey) { // Shift key + 9 = cycling backwards, don't add a new item
    var currentRow = $(evt.target).parents('tr'),
      rowId = currentRow.data('itemId');
    var itemNums = currentRow.parent().children('tr').map(function (idx, row) {
        var itemId = $(row).data('itemId');
        console.log('Item Ids #' + idx + ': ' + itemId + ' - ' + row.toString() + ' - ' + $(row));
        return itemId;
      }),
      maxItemNum = Math.max.apply(null, itemNums);

    console.log('Checking [tab] key press - rowId: ' + rowId + ' (' + itemNums + ') maxItemNum: ' + maxItemNum);
    if (rowId == maxItemNum) {
      evt.preventDefault();
      var tBody = currentRow.parent();
      window.checklists.addItem(tBody);
    }
  }
}

function toggleStrikeThroughOnChecked(chk) {
  $(chk).parents('tr')
    .find('span.colored-strike')
    .toggleClass('strike', chk.checked);
}

function setCheckAllChecked() {
  var checkAll = $('.check-all')[0];
  checkAll.checked = $('.check-item:enabled').length === $('.check-item:checked').length;
}

function onCheckboxChange() {
  toggleStrikeThroughOnChecked(this)
  setCheckAllChecked();
}

function onCheckAll() {
  var checkAll = this;
  var enabledCheckBoxes = $(this)
    .parents('table').find('tbody input.my-input:valid')
    .parents('tr').find('.check-item');

  enabledCheckBoxes
    .each(function(idx){
      var chk = enabledCheckBoxes[idx];
      chk.checked = !chk.disabled && checkAll.checked;
      toggleStrikeThroughOnChecked(chk);
    });
}

function onMyInputBlur() {
  var input = $(this);
  var inputParent = input.parent();
  var span = inputParent.find('span.colored-strike');
  var label = inputParent.find('label[for="' + input.get(0).id + '"]');
  var isValid = inputParent.find('input.my-input:valid').length > 0;

  input.prev().toggleClass('shrink', false);

  label.toggleClass('hidden', isValid);

  toggleHiddenInput(isValid, input, span, false);
  setCheckAllChecked();
}

function onMyInputFocus() {
  var input = $(this);

  input.prev().toggleClass('shrink', true);
}

function onSpanClick() {
  var span = $(this);
  var input = span.parent().find('input.my-input');

  toggleHiddenInput(false, input, span, true);
}

function toggleHiddenInput(hide, input, span, focusInput) {
  var check = input.parents('tr').find('input[type="checkbox"]');

  input.toggleClass('hidden', hide);
  span.toggleClass('hidden', !hide);

  if (hide) {
    span.text(input.val());
  } else if (focusInput) {
    input.focus();
  }

  check[0].disabled = !hide;

  if (!hide) {
    check[0].checked = false;
    span.toggleClass('strike', false);
  }
}

window.checklists = {
  itemCount: 1,
  remove: function (anchorTag) {
    var row = $(anchorTag).parents('tr');
    var tBody = row.parent();

    var itemId = row.data('itemId');
    var itemIds = tBody.children('tr').toArray().map(function (tr) {
      return $(tr).data('itemId');
    });
    var maxId = Math.max.apply(null, itemIds);

    if (itemId == maxId) { //deleting the item with the addNewItemAnchor, so move it first
      var removeIdx = itemIds.indexOf(maxId);
      itemIds.splice(removeIdx, 1);

      if (itemIds.length === 0) {//this is the last item, so create a new one and then move the anchor
        window.checklists.addItem(tBody);
        itemIds.push(window.checklists.itemCount);
      }

      maxId = Math.max.apply(null, itemIds);
      var addNewItemAnchor = tBody.find('#addNewItem');
      addNewItemAnchor
        .appendTo(tBody.find('tr[data-item-id="' + maxId + '"] > td > a').parent());
    }

    row.remove();
    setCheckAllChecked();
  },
  addItem: function (tBody) {
    var itemNum = ++window.checklists.itemCount;

    var row = $('<tr data-item-id="' + itemNum + '"></tr>');
    tBody.append(row);

    var checkCell = $('<td></td>');
    var check = $('<input class="check-item" type="checkbox" disabled>');
    check.on('change', onCheckboxChange);
    checkCell.append(check);

    var inputCell = $('<td></td>');
    var label = $('<label for="item' + itemNum + '" class="my-label">Item ' + itemNum + '</label>');
    var input = $('<input id="item' + itemNum + '" type="text" class="my-input" required>');
    input.on('blur', onMyInputBlur);
    input.on('focus', onMyInputFocus);
    var span = $('<span tabindex="0" class="colored-strike hidden"></span>');
    span.on('click', onSpanClick);
    inputCell.append(label).append(input).append(span);

    var removeAnchor = $('<a href="#" onclick="window.checklists.remove(this)"></a>')
      .append('<span class="glyphicon glyphicon-remove-sign"></span>');
    removeAnchor.on('keydown', onAnchorRemoveKeydown);

    var removeCell = $('<td></td>')
      .append(removeAnchor);

    row
      .append(checkCell)
      .append(inputCell)
      .append(removeCell);

    var addNewItemAnchor = tBody.find('#addNewItem');
    addNewItemAnchor.appendTo(removeCell);

    input.focus();
  }
};
