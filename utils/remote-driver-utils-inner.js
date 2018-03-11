'use strict';

// This intermediate process is needed because WebStorm closes detached child processes
// when stops debugging.

const fs = require('fs');
const { spawn } = require('child_process');

const errorReportFilePath = '/home/alexey/projects/work/tia-tests/fname';

process.on('message', (data) => {
  let child;

  try {
    child = spawn(
      data.chromeDriverPath,
      [`--port=${data.port}`],
      {
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
      process.send('chromedriver started');
      process.disconnect();
      process.exit(0);
    } catch (err) {
      fs.appendFileSync(errorReportFilePath, `${err}\n`, 'utf8');
    }
  }, data.waitAfterStart);
});
