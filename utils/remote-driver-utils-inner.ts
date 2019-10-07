

// This intermediate process is needed because WebStorm closes detached child processes
// when stops debugging.

import * as fs from 'fs';
import { ChildProcess, spawn } from 'child_process';

const errorReportFilePath = '/home/alexey/projects/work/tia-tests/fname';

process.on('message', data => {
  let child: ChildProcess;

  try {
    child = spawn(data.chromeDriverPath, [`--port=${data.port}`], {
      detached: true,
      stdio: ['ignore', 'ignore', 'ignore'],
    });

    // Save the pid.
    fs.writeFileSync(data.pidPath, child.pid, 'utf8');
  } catch (err) {
    fs.appendFileSync(errorReportFilePath, `${err}\n`, 'utf8');
  }

  setTimeout(() => {
    try {
      child.unref();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      process.send('chromedriver started');
      process.disconnect();
      process.exit(0);
    } catch (err) {
      fs.appendFileSync(errorReportFilePath, `${err}\n`, 'utf8');
    }
  }, data.waitAfterStart);
});
