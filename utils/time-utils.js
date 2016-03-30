gT.timeUtils = {};

gT.timeUtils.startTimer = function () {
  return process.hrtime();
};

/**
 * returns time interval in milliseconds.
 * @param startTime - the data returned by startTimer.
 */
gT.timeUtils.stopTimer = function (startTime) {
  var diff = process.hrtime(startTime);
  return diff[0] * 1000 + diff[1] / 1e6;
};
