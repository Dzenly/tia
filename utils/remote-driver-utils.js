'use strict';
/* globals gIn: true, gT */

// TODO: Move to engine?

var fs = require('fs');
var path = require('path');
const cp = require('child_process');

var spawn = cp.spawn;

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

exports.start = function start1() {

  return gT.sOrig.promise.createPromise(function (resolve, reject) {

    gIn.tracer.msg3('Starting remote driver');

    try {

      const child = cp.spawn(
        `${process.execPath}`,
        [`${__dirname}/remote-driver-utils-inner.js`],
        // [
        //   gIn.chromeDriverPath,
        //   getPidPath(),
        //   gT.suiteConfig.remoteDriverPort
        // ],
        {
          stdio: ['ignore', 'ignore', 'ignore'/*, 'ipc'*/],
        }
      );

      // child.disconnect();
      child.unref();
      console.log('Child PID: ' + child.pid);
    } catch (e) {
      console.log(e);
    }

    setTimeout(function () {
      reject(true);
    }, gT.engineConsts.remoteDriverStartTime);
  });
};

// TODO: it is temporary. Fix it.
/**
 * starts remote chromedriver
 * @returns {Promise}
 */
exports.start1 = function start2() {
  if (getPid()) {
    gIn.tracer.msg3('Remote driver is already started');
    return gT.sOrig.promise.fulfilled(true);
  }

  return gT.sOrig.promise.createPromise(function (resolve, reject) {

    // http://stackoverflow.com/questions/37427360/parent-process-kills-child-process-even-though-detached-is-set-to-true
    // https://github.com/nodejs/node/issues/7269#issuecomment-225698625

    var child = spawn(
      gIn.chromeDriverPath,
      ['--port=' + gT.suiteConfig.remoteDriverPort],
      {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
      });
    child.unref();
    savePid(child.pid);
    gIn.tracer.msg3('Starting remote driver');
    setTimeout(function () {
      resolve(true);
    }, gT.engineConsts.remoteDriverStartTime);
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
  var pid = getPid();
  if (!pid) {
    gIn.tracer.msg3('No remote driver to stop');
    return;
  }
  gIn.tracer.msg3('Stopping remote driver');
  process.kill(pid);
  removePid();
  exports.removeSid();
};
