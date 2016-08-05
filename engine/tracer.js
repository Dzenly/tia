'use strict';

/* globals gIn: true */

exports.err = function (msg) {
  gIn.cLogger.errln('TRCERR: ' + msg);
};

exports.exc = function (err) {
  gIn.cLogger.errln(gIn.textUtils.excToStr(err));
};

// To distinct tracing from common console.log's.
exports.msg0 = function (msg) {
  if (gIn.params.traceLevel > -1) {
    gIn.cLogger.msgln('TRC0: ' + msg);
  }
};

exports.msg1 = function (msg) {
  if (gIn.params.traceLevel > 0) {
    gIn.cLogger.msgln('TRC1: ' + msg);
  }
};

exports.msg2 = function (msg) {
  if (gIn.params.traceLevel > 1) {
    gIn.cLogger.msgln('TRC2: ' + msg);
  }
};

exports.msg3 = function (msg) {
  if (gIn.params.traceLevel > 2) {
    gIn.cLogger.msgln('TRC3: ' + msg);
  }
};
