'use strict';

/* globals gT: true */

/* globals gIn: true */

/**
 * Safely runs generator.
 * All exceptions are catched and logged.
 *
 * @param gen
 */
function* safeGen(gen) {
  try {
    yield* gen();
  } catch (e) {
    if (gIn.params.errToConsole) {
      gIn.tracer.err('Safe Generator caught error: ' + gIn.textUtils.excToStr(e));
    }
    gT.l.println('Safe Generator caught error: ' + gIn.textUtils.excToStr(e));
  }
}

// Return promise from generator is not supported, i.e. will not be waited.
gT.u.iterate = function (iterator) {

  return new Bluebird(function (resolve, reject) {

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
          .then(function (res) {
            iterate(res);
          })
          .catch(function (err) {
            gIn.tracer.err('Iterate error: ' + err);
            reject(err);
          });
      } else {
        setTimeout(function () {
          iterate(obj.value);
        }, 0);

      }
    }

    iterate();
  });
};

gT.u.execGenSafe = function (gen, param1, param2) {
  return gT.u.iterate(gen(param1, param2))
    .catch(function (e) {
      if (gIn.params.errToConsole) {
        gIn.tracer.err('Safe Generator caught error: ' + gIn.textUtils.excToStr(e));
      }
      gT.l.println('Safe Generator caught error: ' + gIn.textUtils.excToStr(e));
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
  var oldTimeout = gIn.params.hangTimeout;
  gIn.params.hangTimeout = newTimeout;
  return oldTimeout;
};

// gT.s.fail = function (url, logAction) {
//   return gIn.wrap('Intentional fail for debug: ... ', logAction, function () {
//     return Bluebird.reject('Intentional fail');
//   });
// };
