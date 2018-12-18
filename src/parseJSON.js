// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  console.log(json, 'heres the beginning')
  var usefulArrayCheckEnds = [',']

  var stringConversion = function(someString, isObject) {
    console.log(someString, 'beginning of conversion');
    
    if (someString.charAt(0) === '{') {
      return parseJSON(someString + '}');
    }
    if (someString.charAt(0) === '[') {
      console.log('conversion of array');
      if (someString.charAt(1) === ']') {
        return [];
      } else {
        return parseJSON(someString + ']');
      }
    }
    if (someString.length === 2 && isNaN(someString.charAt(0))) {
      console.log('hey its empty');
      return "";
    }
    if (!isNaN(someString) && someString.toString().indexOf('.') != -1) {
        return Number(someString);
    }
    if (!isNaN(someString.charAt(0))) {
      console.log('hey its a number', someString)
      var i = someString.length - 1;
      while (someString.charAt(i) === ']' || someString.charAt(i) === '}' || someString.charAt(i) === '"') {
        someString = someString.slice(0, i);
        i--
      }
      return Number(someString)
    }
    else if (someString === 'false') {
      return false
    }
    else if (someString === 'true') {
      return true
    }
    else if (someString.slice(0, 4) === 'null') {
      return null;
    }
    else if (typeof someString === 'string') {
      someString = someString.trim();
      console.log(someString, someString.length, 'isobject?');
      if (someString.charAt(someString.length - 1) === '}' 
      || someString.charAt(someString.length - 1) === ']' 
      || someString.charAt(someString.length - 1) === ' ')  {

        someString = someString.slice(1, someString.length - 2);
        console.log(someString, 'its been trimmed')
        var i = someString.length - 1;
        someString = someString.replace(/\n/g, '')
        while (someString.charAt(i) === ']' || someString.charAt(i) === '}' 
        || someString.charAt(i) === '"' || someString.charAt(i) === ' ') {

          console.log('more more trimming', someString.charAt(i) === ']', someString.charAt(i), '_')
          someString = someString.slice(0, i).trim();
          i--;
          console.log(someString.charAt(i), 'fun end')
        }
        console.log(someString, 'after trimming')
        return someString.trim();
      }
      else {
        console.log('somestring slice 1')
        return someString.slice(1, someString.length - 1)
      }
    }
     else {
      console.log('thats the end of conversion.  no more to do here')
      return someString;
    } 
  } 

  console.log(json, 'start');
  if (json.charAt(0) === '{') {
    console.log('obj start');
    var obj = {};
    var tempStorage1 = "";
    var tempStorage2 = "";
    var check = false;
    var newString = false;
    var count = 0;
    console.log(json.length, 'the length');
    for (var i = 1; i < json.length; i++) {
     // console.log(json.charAt(i), 'heres the object character', count, 'theres the count', check, 'check  check');
      if(json.charAt(i) === '\"' && newString === false) {
        console.log('chaning newstring to true in obj')
        var tempStorage2 = "";
        newString = true;
      } 
      else if(json.charAt(i) === '\"' && newString === true && json.charAt(i + 1) === ' ' && i === json.length - 1) {
        newString = false;
      }

      if (json.charAt(i) === ":" && count === 0) {
        console.log(tempStorage1, tempStorage2, 'storing key');
        tempStorage1 = tempStorage2;
        tempStorage1 = tempStorage1.trim();
        tempStorage2 = "";
        if (tempStorage1.charAt(tempStorage1.length - 1) === '"' && tempStorage1.charAt(tempStorage1.length - 2) == '"') {
          tempStorage1.splice(1, tempStorage1.length - 1)
        }
        console.log(tempStorage1, tempStorage2, 'key stored');
        if (json.charAt(i + 1) === ' ') {
          console.log(tempStorage1, 'addin it extra');
          i++;
        }
        newString = false;
      }
      

      
      else if (tempStorage1.length && (count <= 0 && json.charAt(i) === "," 
      || i === json.length - 1) || (check === true && count < 0)) {
        
        console.log(json.charAt(i), 'heres the character', i, 'its i');
        console.log('_', tempStorage1, '_', 'key', '_', tempStorage2, '_', 'property');
        obj[tempStorage1.slice(1, tempStorage1.length - 1)] = stringConversion(tempStorage2.trim(), true);
        console.log(obj, 'obj has been updated')
        
        newString = false;
        tempStorage1 = "";
        tempStorage2 = "";
        console.log('_', tempStorage1, '_', 'emptykey', '_', tempStorage2, '_', 'emptyproperty');
        check = false;
      }
      else if  (json.charAt(i) === ' ' && json.charAt(i - 1) == '\"') {
        
      }
      else if (json.charAt(i) === '{') {
        count++;
        console.log('starting an object in object', newString, 'newstring is');
        check = true;
        if (newString === false) {
          console.log('and replcing the text for object in object')
          newString = true;
          tempStorage2 = json.charAt(i);
        }
        else {
          tempStorage2 += json.charAt(i);
        }
      }
      else if (json.charAt(i) === '[') {
        count++;
        console.log('starting an array in the object');
        check = true;
        if (newString === false) {
          newString = true;
          tempStorage2 = json.charAt(i);
        }
        else {
          tempStorage2 += json.charAt(i);
        }
      }
      else if (json.charAt(i) === ']') {
        console.log('adding a close bracket', json.charAt(i))
        tempStorage2 += json.charAt(i);
        count--;
        if (usefulArrayCheckEnds.indexOf(json.charAt(i) > -1)){
          console.log('close bracket false')
          check = false
        }
      }
      else if (json.charAt(i) === '}') {
        console.log('adding a close curly', json.charAt(i))
        tempStorage2 += json.charAt(i)
        count--
        if (usefulArrayCheckEnds.indexOf(json.charAt(i) > -1)){
          console.log('close curly false')
          check = false
        }
      }
     
      else if (i < json.length) {
        //console.log('_', json.charAt(i), '_ character to add', check, 'check at state', newString, 'newstring at state', json.length,  'length')
        //console.log('_' + tempStorage2, '_',  'adding things up in obj');
        tempStorage2 += json.charAt(i);
        
      }
      if (i > json.length) {
        console.log(obj, 'last resort');
        return obj;
      }
    }
    
  } 
  
  
  
  
  
  
  
  else if (json.charAt(0) === '[') {
    console.log('array start');
    var obj = [];
    var tempStorage2 = "";
    var check = false;
    var newString = false;
    var count = 0;
    for (var i = 1; i < json.length; i++) {
      if(json.charAt(i) === '\"' && newString === false) {
        console.log('changed newstring to false at beginning of array start');
        var tempStorage2 = "";
        newString = true;
      }
      else if(json.charAt(i) === '\"' && newString === true && i === json.length - 1) {
        console.log('changed newstring to true at beginning of array start');
        newString = false;
      }
      else if (json.charAt(i) === '↵') {
        i++;
      }
      //console.log('beginning of array loop', json.charAt(i), check, 'theres check', count, 'theres count', newString, 'theres newstring');
      
      if (i === json.length - 1 && json.charAt(i) != ']' && json.charAt(i) != '}') {
        console.log('syntax time');
        return SyntaxError
      }
      if (tempStorage2.length && (count <= 0 && json.charAt(i) === "," 
      || i === json.length - 1) || (check === true && count <= 0)) {

        console.log(tempStorage2, 'heres storage', tempStorage2.length, 'heres the length')
        obj.push(stringConversion(tempStorage2, true));
        console.log(obj, 'something was just added to the array');
        tempStorage2 = "";
        console.log(json.charAt(i), 'heres a character array that was just added')
        if (json.charAt(i + 1) != '[' && json.charAt(i + 1) != '{') {
          check = false;
          newString = false;
        } else {
          newString = true;
        }
      }

      else if (json.charAt(i) === '{') {
        console.log('starting an object in array', newString, 'newstring is');
        check = true;
        count++;
        if (newString === false && count < 2) {
          console.log('replacing the string after object in array')
          if (json.charAt(i + 1) != '[' && json.charAt(i + 1) != '{') {
            newString = true;
          }
          if (json.charAt(i - 1) != ',' && (json.charAt (i - 2) != ']')) {
            console.log('comma hell')
            tempStorage2 = json.charAt(i);
          }
        }
        else {
          console.log('last else.  adding', json.charAt(i))
          tempStorage2 += json.charAt(i);
        }
      }

      else if (json.charAt(i) === '[') {
        count++;
        console.log('starting an array in the array', newString, 'newstring is');
        check = true;
        if (newString === false) {
          console.log('changed newstring to true array in array')
          if (json.charAt(i + 1) != '[' || json.charAt(i + 1) != '{') {
            newString = true;
          }
          tempStorage2 = json.charAt(i);
        }
        /* if (json.charAt(i + 1) != '{') {
          newString = false;
        } */

        else {
          console.log('last else.  adding', json.charAt(i))
          tempStorage2 += json.charAt(i);
        }
      }
      else if (json.charAt(i) === ']') {
        tempStorage2 += json.charAt(i);
        count--;
        if (usefulArrayCheckEnds.indexOf(json.charAt(i) > -1)){
          console.log('close curly false')
          check = false
        }
      }
      
      else if (json.charAt(i) === '}') {
        tempStorage2 += json.charAt(i);
        count--;
        if (usefulArrayCheckEnds.indexOf(json.charAt(i) > -1)){
          console.log('close curly false')
          check = false
        }
        
      }
      else if (json.charAt(i) === '\\') {

        if (json.charAt(i + 1) ===  "'") {
          tempStorage2 += "'";
        }
        else if (json.charAt(i + 1) ===  '"') {
          tempStorage2 += '"';
        }
        else if (json.charAt(i + 1) ===  "\\") {
          tempStorage2 += '\\';
        }
        i++;
      }
      else if (json.charAt(i) != ']') {
        console.log(tempStorage2, 'adding things up', check, 'theres the check');
        tempStorage2 += json.charAt(i);
        
      }
    }
  }
  /*if (typeof json === 'object') {
    var keys = Object.keys(json); 

  } */
  console.log(obj, typeof obj, 'obj return');
  return obj;
};

/*
[ "a" ] key [  "b" ] property
[  "c" ] key [  "d" ] property
*/

/* 
[{"a":"b"}, {"c":"d"}]
{"a":[],"c": {}, "b": true} 
*/

/*{"CoreletAPIVersion":2,
"CoreletType":"standalone",
"documentation":"A corelet that provides the capability to upload a folderÃ¢â‚¬â„¢s contents into a userÃ¢â‚¬â„¢s locker.",
"functions":[{
    "documentation":"Displays a dialog box that allows user to select a folder on the local system.",
    "name":"ShowBrowseDialog","parameters":[{
        "documentation":"The callback function for results.",
        "name":"callback",
        "required":true,
        "type":"callback"}]},{
          
    "documentation":"Uploads all mp3 files in the folder provided.",
    "name":"UploadFolder","parameters":[{
        "documentation":"The path to upload mp3 files from.",
        "name":"path",
        "required":true,
        "type":"string"},{
    "documentation": "The callback function for progress.",
    "name":"callback",
    "required":true,
    "type":"callback"}]},{
    "documentation":"Returns the server name to the current locker service.",
    "name":"GetLockerService","parameters":[]},{

    "documentation":"Changes the name of the locker service.",
    "name":"SetLockerService","parameters":[{
          "documentation":"The value of the locker service to set active.",
          "name":"LockerService",
          "required":true,
          "type":"string"}]},
    {"documentation":"Downloads locker files to the suggested folder.",
    "name":"DownloadFile",
    "parameters":[{
          "documentation":"The origin path of the locker file.",
          "name":"path",
          "required":true,"type":"string"},
          {"documentation":"The Window destination path of the locker file.",
          "name":"destination",
          "required":true,
          "type":"integer"},
      {"documentation":"The callback function for progress.",
      "name":"callback",
      "required":true,
      "type":"callback"}]}],
"name":"LockerUploader",
"version":{
      "major":0,
      "micro":1,
      "minor":0},
"versionString":"0.0.1"} */

/* 
[{
    "documentation":"Displays a dialog box that allows user to select a folder on the local system.",
    "name":"ShowBrowseDialog",
    "parameters":[{
        "documentation":"The callback function for results.",
        "name":"callback",
        "required":true,
        "type":"callback"}]},{

    "documentation":"Uploads all mp3 files in the folder provided.",
    "name":"UploadFolder",
    "parameters":[{
          "documentation":"The path to upload mp3 files from.",
          "name":"path",
          "required":true,
          "type":"string"},

          {"documentation": "The callback function for progress.",
          "name":"callback",
          "required":true,
          "type":"callback"}]},{
    "documentation":"Returns the server name to the current locker service.",
    "name":"GetLockerService","parameters":[]},{
      
    "documentation":"Changes the name of the locker service.",
    "name":"SetLockerService","parameters":[{
          "documentation":"The value of the locker service to set active.",
          "name":"LockerService",
          "required":true,
          "type":"string"}]},
    {"documentation":"Downloads locker files to the suggested folder.",
    "name":"DownloadFile",
    "parameters":[{
        "documentation":"The origin path of the locker file.",
        "name":"path",
        "required":true,
        "type":"string"},{
    "documentation":"The Window destination path of the locker file.","name":"destination","required":true,"type":"integer"},{"documentation":"The callback function for progress.","name":"callback","required":true,"type":"callback"}]}]] start

    [{"documentation":"Displays a dialog box that allows user to select a folder on the local system.","name":"ShowBrowseDialog","parameters":[{"documentation":"The callback function for results.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Uploads all mp3 files in the folder provided.","name":"UploadFolder","parameters":[{"documentation":"The path to upload mp3 files from.","name":"path","required":true,"type":"string"},{"documentation": "The callback function for progress.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Returns the server name to the current locker service.","name":"GetLockerService","parameters":[]},{"documentation":"Changes the name of the locker service.","name":"SetLockerService","parameters":[{"documentation":"The value of the locker service to set active.","name":"LockerService","required":true,"type":"string"}]},{"documentation":"Downloads locker files to the suggested folder.","name":"DownloadFile","parameters":[{"documentation":"The origin path of the locker file.","name":"path","required":true,"type":"string"},{"documentation":"The Window destination path of the locker file.","name":"destination","required":true,"type":"integer"},{"documentation":"The callback function for progress.","name":"callback","required":true,"type":"callback"}]}]]

[{"documentation":"Displays a dialog box that allows user to select a folder on the local system.","name":"ShowBrowseDialog","parameters":[{"documentation":"The callback function for results.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Uploads all mp3 files in the folder provided.","name":"UploadFolder","parameters":[{"documentation":"The path to upload mp3 files from.","name":"path","required":true,"type":"string"},{"documentation": "The callback function for progress.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Returns the server name to the current locker service.","name":"GetLockerService","parameters":[]},{"documentation":"Changes the name of the locker service.","name":"SetLockerService","parameters":[{"documentation":"The value of the locker service to set active.","name":"LockerService","required":true,"type":"string"}]},{"documentation":"Downloads locker files to the suggested folder.","name":"DownloadFile","parameters":[{"documentation":"The origin path of the locker file.","name":"path","required":true,"type":"string"},{"documentation":"The Window destination path of the locker file.","name":"destination","required":true,"type":"integer"},{"documentation":"The callback function for progress.","name":"callback","required":true,"type":"callback"}]}]]

[{"documentation":"Displays a dialog box that allows user to select a folder on the local system.","name":"ShowBrowseDialog","parameters":[{"documentation":"The callback function for results.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Uploads all mp3 files in the folder provided.","name":"UploadFolder","parameters":[{"documentation":"The path to upload mp3 files from.","name":"path","required":true,"type":"string"},{"documentation": "The callback function for progress.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Returns the server name to the current locker service.","name":"GetLockerService","parameters":[]},{"documentation":"Changes the name of the locker service.","name":"SetLockerService","parameters":[{"documentation":"The value of the locker service to set active.","name":"LockerService","required":true,"type":"string"}]},{"documentation":"Downloads locker files to the suggested folder.","name":"DownloadFile","parameters":[{"documentation":"The origin path of the locker file.","name":"path","required":true,"type":"string"},{"documentation":"The Window destination path of the locker file.","name":"destination","required":true,"type":"integer"},{"documentation":"The callback function for progress.","name":"callback","required":true,"type":"callback"}]}]]
[{"documentation":"Displays a dialog box that allows user to select a folder on the local system.","name":"ShowBrowseDialog","parameters":[{"documentation":"The callback function for results.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Uploads all mp3 files in the folder provided.","name":"UploadFolder","parameters":[{"documentation":"The path to upload mp3 files from.","name":"path","required":true,"type":"string"},{"documentation": "The callback function for progress.","name":"callback","required":true,"type":"callback"}]},{"documentation":"Returns the server name to the current locker service.","name":"GetLockerService","parameters":[]},{"documentation":"Changes the name of the locker service.","name":"SetLockerService","parameters":[{"documentation":"The value of the locker service to set active.","name":"LockerService","required":true,"type":"string"}]} */