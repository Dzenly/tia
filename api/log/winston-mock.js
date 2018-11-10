'use strict';

const funcs = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly',
];

/**
 *
 * @param prefix - to add to the first argument.
 */
module.exports = function winstonMock(prefix) {
  let allowedLevel;

  const logger = {};

  const userStrLevel = process.env.LOG_LEVEL;

  if (userStrLevel) {
    allowedLevel = funcs.indexOf(userStrLevel);
    if (allowedLevel === -1) {
      throw new Error('Incorrect LOG_LEVEL env var.');
    }
  } else {
    allowedLevel = funcs.length;
  }

  for (let curLevel = 0; curLevel < funcs.length; curLevel++) {
    const func = funcs[curLevel];

    logger[func] = (...args) => {
      if (curLevel <= allowedLevel && args) {
        args[0] = prefix + `${func}: ` + args[0];
        for (const str of args) {
          gT.l.println(gIn.textUtils.valToStr(str));
        }
      }
    };
  }

  return logger;
};
