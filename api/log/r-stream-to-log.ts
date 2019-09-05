'use strict';

/**
 * Redirects stream to the current test log.
 * @param stream
 */
module.exports = function rStreamToLog(stream) {
  stream.on('data', (chunk) => {
    const str = gIn.textUtils.valToStr(chunk);
    gT.l.println(str);
  });
  stream.on('error', err => gIn.logger.errorln(err.toString()));
  stream.on('end', () => gT.l.println('End Event.'));
};
