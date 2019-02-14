'use strict';

/* globals gT: true */

/* globals gIn: true */

const path = require('path');

/**
 * Safely runs generator.
 * All exceptions are catched and logged.
 *
 * @param gen
 */
// function* safeGen(gen) {
//   try {
//     yield* gen();
//   } catch (e) {
//     if (gT.cLParams.errToConsole) {
//       gIn.tracer.err(`Safe Generator caught error: ${gIn.textUtils.excToStr(e)}`);
//     }
//     gT.l.println(`Safe Generator caught error: ${gIn.textUtils.excToStr(e)}`);
//   }
// }

// Return promise from generator is not supported, i.e. will not be waited.
gT_.u.iterate = function iterate1(iterator) {
  return new Promise((resolve, reject) => {
    let obj;

    function iterate(ret) {
      obj = iterator.next(ret);

      // TODO: check if obj.value is Promise. Improve test for generators.
      if (obj.done) {
        resolve(obj.value);
        return;
      }

      if (gT.nodeUtils.isPromise(obj.value)) {
        obj.value
          .then(res => {
            iterate(res);
          })
          .catch(err => {
            gIn.tracer.err(`Iterate error: ${err}`);
            reject(err);
          });
      } else {
        setTimeout(() => {
          iterate(obj.value);
        }, 0);
      }
    }

    iterate();
  });
};

gT_.u.iterateSafe = function iterateSafe(iterator) {
  return gT.u.iterate(iterator).catch(e => {
    const strErr = `Safe Iterator caught error: ${gIn.textUtils.excToStr(e)}`;
    if (gT.cLParams.errToConsole) {
      gIn.tracer.err(strErr);
    }
    gT.l.println(strErr);
  });
};

gT_.u.execGenSafe = function execGenSafe(gen, ...params) {
  return gT.u.iterate(gen(...params)).catch(e => {
    const strErr = `Safe Generator runner caught error: ${gIn.textUtils.excToStr(e)}`;
    if (gT.cLParams.errToConsole) {
      gIn.tracer.err(strErr);
    }
    gT.l.println(strErr);
  });
};

/**
 * Runs function - generator.
 * Note: the function uses flow and Promise from selenium webdriver.
 *
 * @param gen - function - generator.
 * @returns {Promise}
 */
gT_.u.execGen = function execGen(gen, param1, param2) {
  return gT.u.iterate(gen(param1, param2));
};

gT_.u.setHangTimeout = function setHangTimeout(newTimeout) {
  const oldTimeout = gT.cLParams.hangTimeout;
  gT.cLParams.hangTimeout = newTimeout;
  return oldTimeout;
};

gT_.u.isWindows = function isWindows() {
  return path.sep === '\\';
};

// gT_.s.fail = function (url, logAction) {
//   return gIn.wrap('Intentional fail for debug: ... ', logAction, function () {
//     return Promise.reject('Intentional fail');
//   });
// };
