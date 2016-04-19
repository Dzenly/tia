'use strict';

/* globals gIn: true */

exports.traceErr = function (msg) {
  console.error('TRCERR: ' + msg);
};

// To distinct tracing from common console.log's.
exports.trace0 = function (msg) {
  console.log('TRC0: ' + msg);
};

exports.trace1 = function (msg) {
  if (gIn.params.traceLevel > 0) {
    console.log('TRC1: ' + msg);
  }
};

exports.trace2 = function (msg) {
  if (gIn.params.traceLevel > 1) {
    console.log('TRC2: ' + msg);
  }
};

exports.trace3 = function (msg) {
  if (gIn.params.traceLevel > 2) {
    console.log('TRC3: ' + msg);
  }
};
