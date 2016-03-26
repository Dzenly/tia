var os = require('os');

gTE.nextScreenShotPath = function() {
	var jsPath = gTE.tinfo.data.path;
	var index = (gTE.tinfo.data.screenShotCounter++) + '';
	if (index.length < 2)
		index = '0' + index;
	return gTE.textUtils.changeExt(jsPath, '_' + index + '.png');
};

gTE.os = function() {
	return os.platform() + '_' + os.release();
};

gTE.copyObject = function(obj) {
	var result = {};
	for (var prop in obj) {
		result[prop] = obj[prop];
	}
	return result;
};


