export function err(msg: string) {
  gIn.cLogger.errln(`${gIn.tracePrefix}TRCERR: ${msg}`);
}

export function exc(err: Error) {
  gIn.cLogger.errln(`${gIn.tracePrefix}TRCEXC: ${gIn.textUtils.excToStr(err)}`);
}

/**
 * Temporary tracing for debug to disctinct it from other tracing.
 * Note: find 'gIn.tracer.dbg' entry in sources to clean up them.
 * @param err
 */
export function dbg(msg: string) {
  gIn.cLogger.msgDbg(`${gIn.tracePrefix}TMP DBG TRC: ${msg}`);
}

export function resourcesUsage() {
  gIn.cLogger.logResourcesUsage('TRC: ');
}

export function resourcesUsage0() {
  if (gT.cLParams.traceLevel > -1) {
    gIn.cLogger.logResourcesUsage('TRC0: ');
  }
}

// To distinct tracing from common console.log's.
export function msg0(msg: string) {
  if (gT.cLParams.traceLevel > -1) {
    gIn.cLogger.msgln(`${gIn.tracePrefix}TRC0: ${msg}`);
  }
}

export function msg1(msg: string) {
  if (gT.cLParams.traceLevel > 0) {
    gIn.cLogger.msgln(`${gIn.tracePrefix}TRC1: ${msg}`);
  }
}

export function msg2(msg: string) {
  if (gT.cLParams.traceLevel > 1) {
    gIn.cLogger.msgln(`${gIn.tracePrefix}TRC2: ${msg}`);
  }
}

export function msg3(msg: string) {
  if (gT.cLParams.traceLevel > 2) {
    gIn.cLogger.msgln(`${gIn.tracePrefix}TRC3: ${msg}`);
  }
}
