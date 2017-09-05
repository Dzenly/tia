'use strict';

/* globals gT: true */

exports.removeSelSid = function removeSelSid(str) {
  var re = /\?_dc=\d+/g;
  return str.replace(re, '');
};

exports.filterStack = function filterStack(strStack) {
  var stArr = strStack.split('\n');
  var newArr = stArr.filter(function (el, index, arr) {
    let startingFrom = el.indexOf('/tia/');
    return el.indexOf('node_modules', startingFrom) === -1;
  });
  return newArr.join('\n');
};

exports.excToStr = function excToStr(err, noStack) {
  if (typeof err === 'undefined') {
    return '\nNo Exception info\n';
  }
  var errStr = err.toString();//(typeof err.message === 'undefined') ? err : err.message;
  if (/*gIn.params.stackToLog || */!noStack) {
    if (typeof err.stack !== 'undefined') {
      errStr += '\n' + exports.filterStack(err.stack);
    } else {
      errStr += '\n No stack trace\n';
    }
  }
  return errStr;
};

exports.winToUnixSep = function winToUnixSep(path) {
  return path.replace(/\\\\/g, '/');
};

exports.changeExt = function changeExt(jsPath, newExt) {
  return jsPath.substr(0, jsPath.length - 3) + newExt;
};

/**
 * Creates log path knowing js file path.
 * Just replaces two last symbols by 'log' at the end of string.
 * @param jsPath - path to js file.
 */
exports.jsToLog = function jsToLog(jsPath) {
  return exports.changeExt(jsPath, '.log');
};

exports.jsToDif = function jsToDif(jsPath) {
  return exports.changeExt(jsPath, '.dif');
};

exports.expandHost = function expandHost(str) {
  return str.replace('$(host)', gIn.config.selHost);
};

exports.collapseHost = function collapseHost(str) {
  return str.replace(gIn.config.selHost, '$(host)');
};

//function escapeRegExp(string) {
//	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
//}
//
//exports.prepareHostRE = function(){
//	var str = escapeRegExp(gIn.config.selHost);
//	exports.hostRe = new RegExp(str, g);
//};

//// Multi-line version.
//exports.collapseHostML = function(str){
//	// TODO: optimize, this function should be called only if gIn.config.selHost is changed.
//	// For now there are not even such use cases.
//	exports.prepareHostRE();
//	return str.replace(exports.hostRe, '$(host)');
//};
