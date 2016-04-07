'use strict';

exports.startTimer = function () {
  return process.hrtime();
};

/**
 * returns time interval in milliseconds.
 * @param startTime - the data returned by startTimer.
 */
exports.stopTimer = function (startTime) {
  var diff = process.hrtime(startTime);
  return diff[0] * 1000 + diff[1] / 1e6;
};
