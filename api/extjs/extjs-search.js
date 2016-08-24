'use strict';

exports.byIdCompQuery = function (id, compQuery, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Searching id by container ${id.logStr}, compQuery: ${compQuery} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdCompQuery('${id.id}', '${compQuery}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`byIdCompQuery, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.byFormIdName = function (id, name, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Searching id by form ${id.logStr}, name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byFormIdName('${id.id}', '${name}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`byFormIdName, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.byIdRef = function (id, ref, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Searching id by container ${id.logStr}, reference: ${ref} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdRef('${id.id}', '${ref}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`byIdRef, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.inputByIdCompQuery = function (id, compQuery, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Searching input id by container ${id.logStr}, compQuery: ${compQuery} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byIdCompQuery('${id.id}', '${compQuery}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`inputByIdCompQuery, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.inputByFormIdName = function (id, name, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Searching input id by form ${id.logStr}, name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byFormIdName('${id.id}', '${name}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`inputByFormIdName, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.inputByIdRef = function (id, ref, logAction) {
  id = gT.s.misc.getIdInfo(id);
  return gIn.wrap(`Searching input id by container ${id.logStr}, reference: ${ref} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byIdRef('${id.id}', '${ref}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`inputByIdRef, found id: ${foundId}`);
        return foundId;
      });
  });
};
