'use strict';

exports.startTimer = function startTimer() {
  return process.hrtime();
};

/**
 * returns time interval in milliseconds.
 * @param startTime - the data returned by startTimer.
 */
exports.stopTimer = function stopTimer(startTime) {
  const diff = process.hrtime(startTime);
  return diff[0] * 1000 + diff[1] / 1e6;
};
