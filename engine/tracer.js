'use strict';

/* globals gIn: true */

exports.traceErr = function (msg) {
  gIn.cLogger.errln('TRCERR: ' + msg);
};

// To distinct tracing from common console.log's.
exports.trace0 = function (msg) {
  if (gIn.params.traceLevel > -1) {
    gIn.cLogger.msgln('TRC0: ' + msg);
  }
};

exports.trace1 = function (msg) {
  if (gIn.params.traceLevel > 0) {
    gIn.cLogger.msgln('TRC1: ' + msg);
  }
};

exports.trace2 = function (msg) {
  if (gIn.params.traceLevel > 1) {
    gIn.cLogger.msgln('TRC2: ' + msg);
  }
};

exports.trace3 = function (msg) {
  if (gIn.params.traceLevel > 2) {
    gIn.cLogger.msgln('TRC3: ' + msg);
  }
};
