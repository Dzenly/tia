'use strict';

/* globals gIn: true, gT */

// TODO: Move to engine?

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const Bluebird = require('bluebird');

function getPidPath() {
  return path.join(gIn.params.testsParentDir, gT.engineConsts.remoteChromeDriverPid);
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
  return path.join(gIn.params.testsParentDir, gT.engineConsts.remoteChromeDriverSid);
}

exports.saveSid = function saveSid(sid) {
  fs.writeFileSync(getSidPath(), sid, 'utf8');
};

exports.removeSid = function removeSid() {
  gIn.fileUtils.safeUnlink(getSidPath());
};

exports.getSid = function getSid() {
  try {
    return fs.readFileSync(getSidPath(), 'utf8');
  } catch (e) {
    return null;
  }
};

const ALREADY_STARTED = 'Remote driver is already started';
const SHOULD_BE_ONLINE = 'Remote driver should be online';

exports.start = function start1() {
  return new Bluebird(resolve => {
    gIn.tracer.msg3('Starting remote driver');

    const data = {
      chromeDriverPath: gIn.chromeDriverPath,
      pidPath: getPidPath(),
      port: gT.suiteConfig.remoteDriverPort,
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
};

// TODO: it is temporary. Fix it.
/**
 * starts remote chromedriver
 * @returns {Promise}
 */
exports.startOld = function startOld() {
  if (getPid()) {
    gIn.tracer.msg3(ALREADY_STARTED);
    return Promise.resolve(ALREADY_STARTED);
  }

  return new Bluebird(resolve => {
    // http://stackoverflow.com/questions/37427360/parent-process-kills-child-process-even-though-detached-is-set-to-true
    // https://github.com/nodejs/node/issues/7269#issuecomment-225698625

    const child = spawn(gIn.chromeDriverPath, [`--port=${gT.suiteConfig.remoteDriverPort}`], {
      detached: true,
      stdio: ['ignore', 'ignore', 'ignore'],
    });

    savePid(child.pid);

    setTimeout(() => {
      child.unref();

      // TODO: may be check remote chromedriver somehow ? instead o sleep.
      gIn.tracer.msg3(SHOULD_BE_ONLINE);
      resolve(SHOULD_BE_ONLINE);
    }, gT.engineConsts.remoteDriverStartDelay);

    // child.stdout.on('data', (data) => {
    //   gIn.tracer.trace2('Output from chromedriver: ' + data);
    // });
    // child.disconnect();
  });
};

/**
 * Stops remote chromedriver.
 */
exports.stop = function stop() {
  const pid = getPid();
  if (!pid) {
    gIn.tracer.msg3('No remote driver to stop');
    return;
  }
  gIn.tracer.msg3('Stopping remote driver');
  process.kill(pid);
  removePid();
  exports.removeSid();
};
