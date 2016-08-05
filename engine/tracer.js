'use strict';

/* globals gIn: true */

exports.err = function (msg) {
  gIn.cLogger.errln(gIn.tracePref  + 'TRCERR: ' + msg);
};

exports.exc = function (err) {
  gIn.cLogger.errln(gIn.tracePref + 'TRCEXC: ' + gIn.textUtils.excToStr(err));
};

// To distinct tracing from common console.log's.
exports.msg0 = function (msg) {
  if (gIn.params.traceLevel > -1) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC0: ' + msg);
  }
};

exports.msg1 = function (msg) {
  if (gIn.params.traceLevel > 0) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC1: ' + msg);
  }
};

exports.msg2 = function (msg) {
  if (gIn.params.traceLevel > 1) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC2: ' + msg);
  }
};

exports.msg3 = function (msg) {
  if (gIn.params.traceLevel > 2) {
    gIn.cLogger.msgln(gIn.tracePref + 'TRC3: ' + msg);
  }
};
