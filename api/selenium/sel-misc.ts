import { IdForLog, IdForLogObj } from '../common-types';

export function idToIdForLogObj(id: IdForLog): IdForLogObj {
  let res;
  if (typeof id === 'object') {
    if (id.logStr) {
      // Already converted.
      return id;
    }
    res = {
      id: id.id,
      logStr: `(${id.nameForLog})`,
    };
  } else {
    res = {
      id,
      logStr: `(id: ${id})`,
    };
  }

  // res.valueOf = function () {
  //   return this.logStr;
  // };
  // res.toString = function () { // Seems like template strings do not use valueOf().
  //   return this.logStr;
  // };
  return res;
}

// Dummy functions for tests for test engine.
// Msg - is just message to identify the place in test.

// gT.s.dummyPromiseFulfilled = function (msg) {
//   return gIn.wrap('Dummy promise fulfilled: "' + msg, enableLog, function () {
//     return Promise.resolve('Fulfilled');
//   });
// };
//
// gT.s.dummyPromiseRejected = function (msg) {
//   return gIn.wrap('Dummy promise rejected: "' + msg, enableLog, function () {
//     return Promise.reject('Rejected');
//   });
// };
//
// gT.s.dummyPromiseThrowed = function (msg) {
//   return gIn.wrap('Dummy promise rejected: "' + msg, enableLog, function () {
//     return Promise.reject('Rejected');
//   });
// };

// gT.s.dummyThrowErr = function (msg) {
//
// };
//
// gT.s.dummyThrowStr = function (msg) {
//
// };
//
// gT.s.dummySyntaxError = function (msg) {
//
// };
