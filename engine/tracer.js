gT.tracer = {};

var self = gT.tracer;

gT.tracer.traceErr = function (msg) {
  console.error('TRCERR: ' + msg);
};

// To distinct tracing from common console.log's.
gT.tracer.trace0 = function (msg) {
  console.log('TRC0: ' + msg);
};

gT.tracer.trace1 = function (msg) {
  if (gT.params.trace > 0) {
    console.log('TRC1: ' + msg);
  }
};

gT.tracer.trace2 = function (msg) {
  if (gT.params.trace > 1) {
    console.log('TRC2: ' + msg);
  }
};

gT.tracer.trace3 = function (msg) {
  if (gT.params.trace > 2) {
    console.log('TRC3: ' + msg);
  }
};
