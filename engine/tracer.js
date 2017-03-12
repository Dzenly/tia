'use strict';

/* globals gIn: true */

exports.err = function err(msg) {
  gIn.cLogger.errln(gIn.tracePref  + 'TRCERR: ' + msg);
};

exports.exc = function exc(err) {
  gIn.cLogger.errln(gIn.tracePref + 'TRCEXC: ' + gIn.textUtils.excToStr(err));
};

/**
 * Temporary tracing for debug to disctinct it from other tracing.
 * Note: find 'gIn.tracer.dbg' entry in sources to clean up them.
 * @param err
 */
exports.dbg = function dbg(msg) {
  gIn.cLogger.msgDbg(gIn.tracePref + 'TMP DBG TRC: ' + msg);
};

exports.resourcesUsage = function resourcesUsage() {
  gIn.cLogger.logResourcesUsage('TRC: ');
};

exports.resourcesUsage0 = function resourcesUsage0() {
  if (gIn.params.traceLevel > -1) {
    gIn.cLogger.logResourcesUsage('TRC0: ');
  }
};

// To distinct tracing from common console.log's.
exports.msg0 = function msg0(msg) {
  if (gIn.params.traceLevel > -1) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC0: ' + msg);
  }
};

exports.msg1 = function msg1(msg) {
  if (gIn.params.traceLevel > 0) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC1: ' + msg);
  }
};

exports.msg2 = function msg2(msg) {
  if (gIn.params.traceLevel > 1) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC2: ' + msg);
  }
};

exports.msg3 = function msg3(msg) {
  if (gIn.params.traceLevel > 2) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC3: ' + msg);
  }
};
