/**
 * Redirects stream to the current test log.
 * @param stream
 */
import { Stream } from 'stream';

export default function rStreamToLog(stream: Stream) {
  stream.on('data', (chunk: any) => {
    const str = gIn.textUtils.valToStr(chunk);
    gT.l.println(str);
  });
  stream.on('error', err => gIn.logger.errorln(err.toString()));
  stream.on('end', () => gT.l.println('End Event.'));
}
