'use strict';
/* globals gT: true */

exports.getIdInfo = function (id) {
  if (typeof id === 'object') {
    return {
      id: id.id,
      logStr: `(${id.nameForLog})`
    };
  }
  return {
    id: id,
    logStr: `(id: ${id})`
  };
};

// Dummy functions for tests for test engine.
// Msg - is just message to identify the place in test.

// gT.s.dummyPromiseFulfilled = function (msg) {
//   return gIn.wrap('Dummy promise fulfilled: "' + msg, logAction, function () {
//     return promise.fulfilled('Fulfilled');
//   });
// };
//
// gT.s.dummyPromiseRejected = function (msg) {
//   return gIn.wrap('Dummy promise rejected: "' + msg, logAction, function () {
//     return promise.rejected('Rejected');
//   });
// };
//
// gT.s.dummyPromiseThrowed = function (msg) {
//   return gIn.wrap('Dummy promise rejected: "' + msg, logAction, function () {
//     return promise.rejected('Rejected');
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
