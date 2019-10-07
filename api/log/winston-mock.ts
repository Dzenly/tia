import * as _ from 'lodash';

const funcs = ['error', 'warn', 'info', 'verbose', 'debug', 'silly'];

/**
 *
 * @param prefix - to add to the first argument.
 */
export function winstonMock(prefix: string) {
  let allowedLevel: number;

  const logger: any = {};

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

    logger[func] = (...args: any) => {
      const localArgs = _.cloneDeep(args);
      if (curLevel <= allowedLevel && localArgs) {
        localArgs[0] = prefix + `${func}: ` + localArgs[0];
        for (const str of localArgs) {
          if (typeof str === 'string') {
            gT.l.println(str);
          } else {
            gT.l.println(gIn.textUtils.valToStr(str));
          }
        }
      }
    };
  }

  return logger;
}
