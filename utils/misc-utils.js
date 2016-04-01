var os = require('os');

/* globals gT: true */

gT.nextScreenShotPath = function () {
  var jsPath = gT.tinfo.data.path;
  var index = (gT.tinfo.data.screenShotCounter++) + '';
	if (index.length < 2) {
		index = '0' + index;
	}
  return gT.textUtils.changeExt(jsPath, '_' + index + '.png');
};

gT.os = function () {
  return os.platform() + '_' + os.release();
};

gT.copyObject = function (obj) {
  var result = {};
  for (var prop in obj) {
    result[prop] = obj[prop];
  }
  return result;
};


