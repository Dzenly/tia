'use strict';

import * as util from 'util';
import { dirSep } from 'path';

export function removeSelSid(str) {
  const re = /\?_dc=\d+/g;
  return str.replace(re, '');
}

export function filterStack(strStack) {
  const stArr = strStack.split('\n');
  const newArr = stArr.filter(el => {
    const startingFrom = el.indexOf('/tia/');
    return el.indexOf(`${dirSep}node_modules${dirSep}`, startingFrom) === -1;
  });
  return newArr.join('\n');
}

export function excToStr(err, noStack) {
  if (typeof err === 'undefined') {
    return '\nNo Exception info\n';
  }
  let errStr = err.toString(); // (typeof err.message === 'undefined') ? err : err.message;
  if (/* gT.cLParams.stackToLog || */ !noStack) {
    if (typeof err.stack !== 'undefined') {
      errStr += `\n${filterStack(err.stack)}`;
    } else {
      errStr += '\n No stack trace\n';
    }
  }
  return errStr;
}

export function winToUnixSep(path) {
  return path.replace(/\\\\/g, '/');
}

export function changeExt(jsPath, newExt) {
  return jsPath.substr(0, jsPath.length - 3) + newExt;
}

export function jsToEt(jsPath) {
  return changeExt(jsPath, '.et');
}

export function jsToTs(jsPath) {
  return changeExt(jsPath, '.ts');
}

/**
 * Creates log path knowing js file path.
 * Just replaces two last symbols by 'log' at the end of string.
 * @param jsPath - path to js file.
 */
export function jsToLog(jsPath) {
  return changeExt(jsPath, '.log');
}

export function jsToDif(jsPath) {
  return changeExt(jsPath, '.dif');
}

export function expandHost(str) {
  return str.replace('$(host)', gT.config.selHost);
}

export function collapseHost(str) {
  return str.replace(gT.config.selHost, '$(host)');
}

export function valToStr(value) {
  if (Buffer.isBuffer(value)) {
    return value.toString('utf8');
  }

  if (typeof value === 'string') {
    return value;
  }

  return util.inspect(value, { compact: false, sorted: true, depth: Infinity });
}

export function v2s(value) {
  if (Buffer.isBuffer(value)) {
    return value.toString('utf8');
  }

  if (typeof value === 'string') {
    return value;
  }

  return util.inspect(value, {
    compact: true,
    sorted: true,
    depth: Infinity,
    breakLength: 200,
  });
}

// function escapeRegExp(string) {
//   return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
// }
//
// export  function prepareHostRE(){
//  let str = escapeRegExp(gT.config.selHost);
//  hostRe = new RegExp(str, g);
// };

//  // Multi-line version.
// export function collapseHostML(str){
//  // TODO: optimize, this function should be called only if gT.config.selHost is changed.
//  // For now there are not even such use cases.
//  prepareHostRE();
//  return str.replace(hostRe, '$(host)');
//  };
