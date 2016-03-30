gTE.textUtils = {};

gTE.textUtils.removeSelSid = function (str) {
  var re = /\?_dc=\d+/g;
  return str.replace(re, '');
};

gTE.textUtils.filterStack = function (strStack) {
  var stArr = strStack.split('\n');
  var newArr = stArr.filter(function (el, index, arr) {
    return el.indexOf('node_modules') === -1;
  });
  return newArr.join('\n');
}

gTE.textUtils.excToStr = function (err, noStack) {
  var errStr = err.toString();//(typeof err.message === 'undefined') ? err : err.message;
  if (gTE.params.stackToLog || !noStack) {
    if (typeof err.stack !== 'undefined') {
      errStr += '\n' + gTE.textUtils.filterStack(err.stack);
    } else {
      errStr += '\n No stack trace\n';
    }
  }
  return errStr;
};

gTE.textUtils.winToUnixSep = function (path) {
  return path.replace(/\\\\/g, '/');
};

gTE.textUtils.changeExt = function (jsPath, newExt) {
  return jsPath.substr(0, jsPath.length - 3) + newExt;
};

/**
 * Creates log path knowing js file path.
 * Just replaces two last symbols by 'log' at the end of string.
 * @param jsPath - path to js file.
 */
gTE.textUtils.jsToLog = function (jsPath) {
  return gTE.textUtils.changeExt(jsPath, '.log');
};


gTE.textUtils.expandHost = function (str) {
  return str.replace('$(host)', gTE.config.host);
};

gTE.textUtils.collapseHost = function (str) {
  return str.replace(gTE.config.host, '$(host)');
};

//function escapeRegExp(string) {
//	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
//}
//
//gTE.textUtils.prepareHostRE = function(){
//	var str = escapeRegExp(gTE.config.host);
//	gTE.textUtils.hostRe = new RegExp(str, g);
//};

//// Multi-line version.
//gTE.textUtils.collapseHostML = function(str){
//	// TODO: optimize, this function should be called only if gTE.config.host is changed.
//	// For now there are not even such use cases.
//	gTE.textUtils.prepareHostRE();
//	return str.replace(gTE.textUtils.hostRe, '$(host)');
//};
