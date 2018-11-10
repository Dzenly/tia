'use strict';

exports.delayed = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
