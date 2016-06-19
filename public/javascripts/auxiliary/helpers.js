(function(window){
  var ns = window.schradersoft || (window.schradersoft = {});

  ns.getPropNameByVal = function(obj, val){
    for(var prop in obj){
      if(obj.hasOwnProperty(prop) && obj[prop] === val){
        return prop.toString();
      }
    }
  };
})(window);
