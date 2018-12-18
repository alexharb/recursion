// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var list = [];
  if (this.toString() === '[object Window]') {
    var list = (getElementsByClassName.call(document.body, className));
    return list;
  }
   else  {
    if (this.classList.contains(className) && this.toString() === '[object HTMLBodyElement]') {
      list.push(this);
    }
    
    var children = this.children;
    if (children.length > 0) {

      for (var child of children) {
        
        if (child.children.length) {
          var tempList = getElementsByClassName.call(child, className);
          if (tempList.length != 0) {
            for (var j in tempList) {
              list.push(tempList[j]);
            }
          }
          list.concat(tempList);
        }
        if (child.classList.contains(className)) {
          list.push(child);
        }
      }
    }
    return list;
  }
};
