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
//     if (gIn.params.errToConsole) {
//       gIn.tracer.err(`Safe Generator caught error: ${gIn.textUtils.excToStr(e)}`);
//     }
//     gT.l.println(`Safe Generator caught error: ${gIn.textUtils.excToStr(e)}`);
//   }
// }

// Return promise from generator is not supported, i.e. will not be waited.
gT.u.iterate = function iterate1(iterator) {
  return new Promise(((resolve, reject) => {
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
          .then((res) => {
            iterate(res);
          })
          .catch((err) => {
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
  }));
};

gT.u.iterateSafe = function iterateSafe(iterator) {
  return gT.u.iterate(iterator)
    .catch((e) => {
      const strErr = `Safe Iterator caught error: ${gIn.textUtils.excToStr(e)}`;
      if (gIn.params.errToConsole) {
        gIn.tracer.err(strErr);
      }
      gT.l.println(strErr);
    });
};

gT.u.execGenSafe = function execGenSafe(gen, ...params) {
  return gT.u.iterate(gen(...params))
    .catch((e) => {
      const strErr = `Safe Generator runner caught error: ${gIn.textUtils.excToStr(e)}`;
      if (gIn.params.errToConsole) {
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
gT.u.execGen = function execGen(gen, param1, param2) {
  return gT.u.iterate(gen(param1, param2));
};

gT.u.setHangTimeout = function setHangTimeout(newTimeout) {
  const oldTimeout = gIn.params.hangTimeout;
  gIn.params.hangTimeout = newTimeout;
  return oldTimeout;
};

gT.u.isWindows = function isWindows() {
  return path.sep === '\\';
};

// gT.s.fail = function (url, logAction) {
//   return gIn.wrap('Intentional fail for debug: ... ', logAction, function () {
//     return Bluebird.reject('Intentional fail');
//   });
// };
