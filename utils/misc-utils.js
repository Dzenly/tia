'use strict';

exports.copyObject = function (obj) {
  var result = {};
  for (var prop in obj) {
    result[prop] = obj[prop];
  }
  return result;
};
