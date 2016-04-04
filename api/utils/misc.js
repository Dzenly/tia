'use strict';

/* globals gT: true */


/**
 * Safely runs generator.
 * All exceptions are catched and logged.
 *
 * @param gen
 */
function *safeGen(gen) {
  try {
    yield* gen();
  } catch (e) {
    gT.tracer.traceErr('Safe Generator catched error: ' + gT.textUtils.excToStr(e));
  }
}

/**
 * Runs function - generator.
 * Note: the function uses flow and Promise from selenium webdriver.
 *
 * @param gen - function - generator.
 * @returns {Promise}
 */
gT.u.execGen = function (gen) {
  //return flow.execute(gen); // Unsafe variant.
  return gT.s.flow.execute(function () { // Safe variant.
    return gT.s.promise.consume(safeGen, null, gen);
  });
};
