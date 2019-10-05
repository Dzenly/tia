'use strict';

export function startTimer() {
  return process.hrtime();
};

/**
 * returns time interval in milliseconds.
 * @param startTime - the data returned by startTimer.
 */
export function stopTimer(startTime: [number, number]) {
  const dif = process.hrtime(startTime);
  return dif[0] * 1000 + dif[1] / 1e6;
};
