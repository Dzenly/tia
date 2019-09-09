'use strict';

/* globals gT: true */

/* globals gIn: true */

import * as path from 'path';

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
function iterateIterator(iterator) {
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

export {iterateIterator as iterate};

export function iterateSafe(iterator) {
  return gT.u.misc.iterate(iterator).catch(e => {
    const strErr = `Safe Iterator caught error: ${gIn.textUtils.excToStr(e)}`;
    if (gT.cLParams.errToConsole) {
      gIn.tracer.err(strErr);
    }
    gT.l.println(strErr);
  });
};

export function execGenSafe(gen, ...params) {
  return gT.u.misc.iterate(gen(...params)).catch(e => {
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
export function execGen(gen, param1, param2) {
  return gT.u.misc.iterate(gen(param1, param2));
};

export function setHangTimeout(newTimeout) {
  const oldTimeout = gT.cLParams.hangTimeout;
  gT.cLParams.hangTimeout = newTimeout;
  return oldTimeout;
};

export function isWindows() {
  return path.sep === '\\';
};

// gT_.s.fail = function (url, enableLog) {
//   return gIn.wrap('Intentional fail for debug: ... ', enableLog, function () {
//     return Promise.reject('Intentional fail');
//   });
// };
