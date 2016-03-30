gT.textUtils = {};

gT.textUtils.removeSelSid = function (str) {
  var re = /\?_dc=\d+/g;
  return str.replace(re, '');
};

gT.textUtils.filterStack = function (strStack) {
  var stArr = strStack.split('\n');
  var newArr = stArr.filter(function (el, index, arr) {
    return el.indexOf('node_modules') === -1;
  });
  return newArr.join('\n');
}

gT.textUtils.excToStr = function (err, noStack) {
  var errStr = err.toString();//(typeof err.message === 'undefined') ? err : err.message;
  if (gT.params.stackToLog || !noStack) {
    if (typeof err.stack !== 'undefined') {
      errStr += '\n' + gT.textUtils.filterStack(err.stack);
    } else {
      errStr += '\n No stack trace\n';
    }
  }
  return errStr;
};

gT.textUtils.winToUnixSep = function (path) {
  return path.replace(/\\\\/g, '/');
};

gT.textUtils.changeExt = function (jsPath, newExt) {
  return jsPath.substr(0, jsPath.length - 3) + newExt;
};

/**
 * Creates log path knowing js file path.
 * Just replaces two last symbols by 'log' at the end of string.
 * @param jsPath - path to js file.
 */
gT.textUtils.jsToLog = function (jsPath) {
  return gT.textUtils.changeExt(jsPath, '.log');
};


gT.textUtils.expandHost = function (str) {
  return str.replace('$(host)', gT.config.host);
};

gT.textUtils.collapseHost = function (str) {
  return str.replace(gT.config.host, '$(host)');
};

//function escapeRegExp(string) {
//	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
//}
//
//gT.textUtils.prepareHostRE = function(){
//	var str = escapeRegExp(gT.config.host);
//	gT.textUtils.hostRe = new RegExp(str, g);
//};

//// Multi-line version.
//gT.textUtils.collapseHostML = function(str){
//	// TODO: optimize, this function should be called only if gT.config.host is changed.
//	// For now there are not even such use cases.
//	gT.textUtils.prepareHostRE();
//	return str.replace(gT.textUtils.hostRe, '$(host)');
//};
