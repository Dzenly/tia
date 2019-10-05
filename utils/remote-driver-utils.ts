'use strict';

/* globals gIn: true, gT */

// TODO: Move to engine?

import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';

function getPidPath() {
  return path.join(gT.rootResultsDir, gT.engineConsts.remoteChromeDriverPid);
}

function savePid(pid) {
  fs.writeFileSync(getPidPath(), pid, 'utf8');
}

function removePid() {
  gIn.fileUtils.safeUnlink(getPidPath());
}

function getPid() {
  try {
    return Number(fs.readFileSync(getPidPath(), 'utf8'));
  } catch (e) {
    return null;
  }
}

function getSidPath() {
  return path.join(gT.rootResultsDir, gT.engineConsts.remoteChromeDriverSid);
}

export function saveSid(sid) {
  fs.writeFileSync(getSidPath(), sid, 'utf8');
}

export function removeSid() {
  gIn.fileUtils.safeUnlink(getSidPath());
}

export function getSid() {
  try {
    return fs.readFileSync(getSidPath(), 'utf8');
  } catch (e) {
    return null;
  }
}

const ALREADY_STARTED = 'Remote driver is already started';
const SHOULD_BE_ONLINE = 'Remote driver should be online';

export async function start() {
  if (getPid()) {
    gIn.tracer.msg3(ALREADY_STARTED);
    return ALREADY_STARTED;
  }

  return new Promise(resolve => {
    gIn.tracer.msg3('Starting remote driver');

    const data = {
      chromeDriverPath: gIn.chromeDriverPath,
      pidPath: getPidPath(),
      port: gT.globalConfig.remoteDriverPort,
      waitAfterStart: gT.engineConsts.remoteDriverStartDelay,
    };

    try {
      const child = spawn(`${process.execPath}`, [`${__dirname}/remote-driver-utils-inner.js`], {
        stdio: ['ipc'],
      });

      child.send(data);

      child.on('message', msg => {
        gIn.tracer.msg3(`Message from child proc: ${msg}`);
        gIn.tracer.msg3(SHOULD_BE_ONLINE);

        resolve(SHOULD_BE_ONLINE);
      });
    } catch (e) {
      console.log(e);
    }
  });
}

// TODO: The same problem still here.
// https://stackoverflow.com/questions/38207590/nodejs-detached-child-process-killed-when-parent-process-is-killed
/**
 * starts remote chromedriver
 * @returns {Promise}
 */
// export async function startOld() {
//   if (getPid()) {
//     gIn.tracer.msg3(ALREADY_STARTED);
//     return ALREADY_STARTED;
//   }
//
//   return new Promise((resolve) => {
//     // http://stackoverflow.com/questions/37427360/parent-process-kills-child-process-even-though-detached-is-set-to-true
//     // https://github.com/nodejs/node/issues/7269#issuecomment-225698625
//
//     const child = spawn(gIn.chromeDriverPath, [`--port=${gT.globalConfig.remoteDriverPort}`], {
//       detached: true,
//       stdio: ['ignore', 'ignore', 'ignore'],
//     });
//
//     savePid(child.pid);
//
//     setTimeout(() => {
//       child.unref();
//       // child.disconnect();
//
//       // TODO: may be check remote chromedriver somehow ? instead o sleep.
//       gIn.tracer.msg3(SHOULD_BE_ONLINE);
//       resolve(SHOULD_BE_ONLINE);
//     }, gT.engineConsts.remoteDriverStartDelay);
//
//     // child.stdout.on('data', (data) => {
//     //   gIn.tracer.trace2('Output from chromedriver: ' + data);
//     // });
//   });
// };

/**
 * Stops remote chromedriver.
 */
export function stop() {
  const pid = getPid();
  if (!pid) {
    gIn.tracer.msg3('No remote driver to stop');
    return;
  }
  gIn.tracer.msg3('Stopping remote driver');
  try {
    process.kill(pid);
  } catch (e) {
    console.error(e);
  }
  removePid();
  removeSid();
}
