// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  var str = '';
  if (typeof obj === 'function' || typeof obj === 'undefined') {
    return null;
  }
  else if (typeof obj === 'object' && obj !== null) {
    if (!Array.isArray(obj)) {
      str += '{';
      var keys = Object.keys(obj);
      var count = 0;
      for (var i of keys) {
        count++;
        if (typeof obj[i] === 'function' || typeof obj[i] === 'undefined') {
          
        }
        else if (typeof obj[i] === 'object') {
          str += '"' + i.toString() + '"' + ':';
          var tempStr = stringifyJSON(obj[i]);
          str +=  tempStr;
        }
        else if (typeof obj[i] === 'string') {
          str += '"' + i.toString() + '"' + ':';
          str += '"' + obj[i] + '"';
        }
        else {
          str += '"' + i.toString() + '"' + ':';
          str += obj[i].toString();
        }
        if (count < keys.length && str.charAt(str.length - 1) != '{') {
          str += ',';
        }
      }
      str += '}';
    }
    else {
      str+= '[';
      for (var i in obj) {
          var tempStr = stringifyJSON(obj[i]);
          str += tempStr;
          if (i < obj.length - 1) {
            str += ',';
          }
        }
      str +=']';
    } 
  }
  else if (obj === null) {
    str += 'null';
  }
  else if (typeof obj === 'string') {
    str += '"';
    str += obj;
    str += '"';
  }
  else {
    str += obj.toString();
  }
  return str;
};