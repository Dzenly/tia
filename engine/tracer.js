gTE.tracer = {};

var self = gTE.tracer;

self.traceErr = function (msg) {
  console.error('TRCERR: ' + msg);
};

// To distinct tracing from common console.log's.
self.trace0 = function (msg) {
  console.log('TRC0: ' + msg);
};

self.trace1 = function (msg) {
  if (gTE.params.trace > 0) {
    console.log('TRC1: ' + msg);
  }
};

self.trace2 = function (msg) {
  if (gTE.params.trace > 1) {
    console.log('TRC2: ' + msg);
  }
};

self.trace3 = function (msg) {
  if (gTE.params.trace > 2) {
    console.log('TRC3: ' + msg);
  }
};
