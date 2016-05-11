'use strict';
/* globals gIn: true */

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
      ['--port=' + gT.suiteConfig.remoteChromeDriverPort],
      {
        detached: true
        , stdio: 'ignore'
      });
    savePid(child.pid);
    child.unref();
    gIn.tracer.trace3('Remote driver is starting');
    setTimeout(function () {
      // console.log('child.connected: ' + child.connected);
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
  gIn.tracer.trace3('Remote driver is stopping');
  process.kill(pid);
  removePid();
};
