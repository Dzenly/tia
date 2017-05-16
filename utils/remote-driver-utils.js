'use strict';
/* globals gIn: true, gT */

// TODO: Move to engine?

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

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

/**
 * starts remote chromedriver
 * @returns {Promise}
 */
exports.start = function start() {
  if (getPid()) {
    gIn.tracer.msg3('Remote driver is already started');
    return gT.sOrig.promise.Promise.resolve(true);
  }

  return new gT.sOrig.promise.Promise(function (resolve, reject) {

    // http://stackoverflow.com/questions/37427360/parent-process-kills-child-process-even-though-detached-is-set-to-true
    // https://github.com/nodejs/node/issues/7269#issuecomment-225698625

    var child = spawn(
      gIn.chromeDriverPath,
      ['--port=' + gT.suiteConfig.remoteDriverPort],
      {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore'],
      });
    savePid(child.pid);
    child.unref();
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
