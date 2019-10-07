/**
 * Redirects stream to the current test log.
 * @param stream
 */
export function rStreamToLog(stream) {
  stream.on('data', (chunk: any) => {
    const str = gIn.textUtils.valToStr(chunk);
    gT.l.println(str);
  });
  stream.on('error', err => gIn.logger.errorln(err.toString()));
  stream.on('end', () => gT.l.println('End Event.'));
};
