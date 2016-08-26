'use strict';

var inspect = require('util').inspect;

exports.byIdCompQuery = function (id, compQuery, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching id by container ${id.logStr}, compQuery: ${compQuery} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdCompQuery('${id.id}', '${compQuery}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`byIdCompQuery, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.byFormIdName = function (id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching id by form ${id.logStr}, name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byFormIdName('${id.id}', '${name}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`byFormIdName, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.byIdRef = function (id, ref, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching id by container ${id.logStr}, reference: ${ref} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdRef('${id.id}', '${ref}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`byIdRef, found id: ${foundId}`);
        return foundId;
      });
  });
};

exports.inputByIdCompQuery = function (id, compQuery, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching input id by container ${id.logStr}, compQuery: ${compQuery} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byIdCompQuery('${id.id}', '${compQuery}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`inputByIdCompQuery, found id: ${inspect(foundId)}`);
        return foundId;
      });
  });
};

exports.inputByFormIdName = function (id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching input id by form ${id.logStr}, name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byFormIdName('${id.id}', '${name}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`inputByFormIdName, found id: ${inspect(foundId)}`);
        return foundId;
      });
  });
};

exports.inputByIdRef = function (id, ref, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching input id by container ${id.logStr}, reference: ${ref} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byIdRef('${id.id}', '${ref}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`inputByIdRef, found id: ${inspect(foundId)}`);
        return foundId;
      });
  });
};

exports.fieldByIdCompQuery = function (id, compQuery, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching field id by container ${id.logStr}, compQuery: ${compQuery} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchFieldId.byIdCompQuery('${id.id}', '${compQuery}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`fieldByIdCompQuery, found id: ${inspect(foundId)}`);
        return foundId;
      });
  });
};

exports.fieldByFormIdName = function (id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching field id by form ${id.logStr}, name: ${name} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchFieldId.byFormIdName('${id.id}', '${name}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`fieldByFormIdName, found id: ${inspect(foundId)}`);
        return foundId;
      });
  });
};

exports.fieldByIdRef = function (id, ref, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching field id by container ${id.logStr}, reference: ${ref} ... `, logAction, function () {
    return gT.s.browser.executeScriptWrapper(`return tiaEJ.searchFieldId.byIdRef('${id.id}', '${ref}')`)
      .then(function (foundId) {
        gIn.tracer.msg3(`fieldByIdRef, found id: ${inspect(foundId)}`);
        return foundId;
      });
  });
};
