

// options for all high level API functions.
function defaultOptions() {
  return {
    logHl: true, // log this high level action
    logLl: false, // log lower level actions
    passHl: true, // is high level action increase pass counter
    passLl: false, // is low level actions increase pass counter
    passLlPrinting: true,
  };
}

/**
 * Wraps some generator for high level actions.
 * @param gen
 * @param msg
 * @param options
 */
export function* wrapGenerator(gen, msg, options) {
  const opts = gT.commonMiscUtils.mergeOptions(options, defaultOptions);

  if (opts.logHl) {
    gT.l.println(`BEGIN: "${msg}"`);
  }

  // In case of fail, the state will be restored before next test.
  const oldLogLl = gT.lL.setDefaultLlLogAction(opts.logLl);
  const oldPassLl = gT.lL.setLlPassCounting(opts.passLl);
  const oldPassLlPrinting = gT.lL.setLlPassPrinting(opts.passLlPrinting);

  const res = yield* gen();

  gT.lL.setDefaultLlLogAction(oldLogLl);
  gT.lL.setLlPassCounting(oldPassLl);
  gT.lL.setLlPassPrinting(oldPassLlPrinting);

  if (opts.logHl) {
    gT.l.println(`END: "${msg}"`);
  }

  if (opts.passHl) {
    gIn.tInfo.addPassForce();
  }

  return res;
};

export async function wrapAsync(func, msg, options) {
  const opts = gT.commonMiscUtils.mergeOptions(options, defaultOptions);

  if (opts.logHl) {
    gT.l.println(`BEGIN: "${msg}"`);
  }

  // In case of fail, the state will be restored before next test.
  const oldLogLl = gT.lL.setDefaultLlLogAction(opts.logLl);
  const oldPassLl = gT.lL.setLlPassCounting(opts.passLl);
  const oldPassLlPrinting = gT.lL.setLlPassPrinting(opts.passLlPrinting);

  const res = await func();

  gT.lL.setDefaultLlLogAction(oldLogLl);
  gT.lL.setLlPassCounting(oldPassLl);
  gT.lL.setLlPassPrinting(oldPassLlPrinting);

  if (opts.logHl) {
    gT.l.println(`END: "${msg}"`);
  }

  if (opts.passHl) {
    gIn.tInfo.addPassForce();
  }

  return res;
};

