'use strict';
/* globals gIn: true, gT */

var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

function getPidPath() {
  return path.join(gIn.params.testsParentDir, gT.engineConsts.remoteChromeDriverPid);
}

function getSidPath() {
  return path.join(gIn.params.testsParentDir, gT.engineConsts.remoteChromeDriverSid);
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

exports.saveSid = function (sid) {
  fs.writeFileSync(getSidPath(), sid, 'utf8');
};

exports.removeSid = function () {
  gIn.fileUtils.safeUnlink(getSidPath());
};

exports.getSid = function () {
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
exports.start = function () {
  if (getPid()) {
    gIn.tracer.trace3('Remote driver is already started');
    return gT.sOrig.promise.fulfilled(true);
  }

  return new gT.sOrig.promise.Promise(function (resolve, reject) {

    var child = spawn(
      gIn.chromeDriverPath,
      ['--port=' + gT.suiteConfig.remoteDriverPort],
      {
        detached: true
        , stdio: 'ignore'
      });
    savePid(child.pid);
    child.unref();
    gIn.tracer.trace3('Starting remote driver');
    setTimeout(function () {
      resolve(true);
    }, 2000); // TODO: magic constant, to make sure that driver is ready.
    // child.stdout.on('data', (data) => {
    //   gIn.tracer.trace2('Output from chromedriver: ' + data);
    // });
    // child.disconnect();
  });
};

/**
 * Stops remote chromedriver.
 */
exports.stop = function () {
  var pid = getPid();
  if (!pid) {
    gIn.tracer.trace3('No remote driver to stop');
    return;
  }
  gIn.tracer.trace3('Stopping remote driver');
  process.kill(pid);
  removePid();
  exports.removeSid();
};
