'use strict';

exports.delayed = function delayed(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
};
