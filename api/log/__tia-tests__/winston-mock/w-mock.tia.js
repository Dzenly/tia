'use strict';

const funcs = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly',
];

function subTest(logLevel) {
  if (logLevel) {
    process.env.LOG_LEVEL = logLevel;
  }
  gT.l.println(`log: level: ${logLevel}`);
  const logger = gT.logUtils.winstonMock('Prefix: ');
  funcs.forEach(func => logger[func](`${func}`));
  gT.l.sep();
}

module.exports = function test() {
  subTest();
  subTest('silly');
  subTest('info');
  subTest('error');
};
