'use strict';
/* globals gT, gIn */

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
