'use strict';

const inspect = require('util').inspect;

exports.byIdCompQuery = function byIdCompQuery(id, compQuery, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching id by container ${id.logStr}, compQuery: ${compQuery} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchId.byIdCompQuery('${id.id}', '${compQuery}')`
    )
      .then((foundId) => {
        gIn.tracer.msg3(`byIdCompQuery, found id: ${foundId}`);
        return foundId;
      }));
};

exports.byFormIdName = function byFormIdName(id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching id by form ${id.logStr}, name: ${name} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byFormIdName('${id.id}', '${name}')`)
      .then((foundId) => {
        gIn.tracer.msg3(`byFormIdName, found id: ${foundId}`);
        return foundId;
      }));
};

exports.byIdRef = function byIdRef(id, ref, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching id by container ${id.logStr}, reference: ${ref} ... `, logAction, () => gT.s.browser.executeScriptWrapper(`return tiaEJ.searchId.byIdRef('${id.id}', '${ref}')`)
    .then((foundId) => {
      gIn.tracer.msg3(`byIdRef, found id: ${foundId}`);
      return foundId;
    }));
};

exports.inputByIdCompQuery = function inputByIdCompQuery(id, compQuery, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(`Searching input id by container ${id.logStr}, compQuery: ${compQuery} ... `, logAction, () => gT.s.browser.executeScriptWrapper(`return tiaEJ.searchInputId.byIdCompQuery('${id.id}', '${compQuery}')`)
    .then((foundId) => {
      gIn.tracer.msg3(`inputByIdCompQuery, found id: ${inspect(foundId)}`);
      return foundId;
    }));
};

exports.inputByFormIdName = function inputByFormIdName(id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching input id by form ${id.logStr}, name: ${name} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchInputId.byFormIdName('${id.id}', '${name}')`
    )
      .then((foundId) => {
        gIn.tracer.msg3(`inputByFormIdName, found id: ${inspect(foundId)}`);
        return foundId;
      }));
};

exports.inputByIdRef = function inputByIdRef(id, ref, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching input id by container ${id.logStr}, reference: ${ref} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchInputId.byIdRef('${id.id}', '${ref}')`
    )
      .then((foundId) => {
        gIn.tracer.msg3(`inputByIdRef, found id: ${inspect(foundId)}`);
        return foundId;
      }));
};

exports.fieldByIdCompQuery = function fieldByIdCompQuery(id, compQuery, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching field id by container ${id.logStr}, compQuery: ${compQuery} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchFieldId.byIdCompQuery('${id.id}', '${compQuery}')`
    )
      .then((foundId) => {
        gIn.tracer.msg3(`fieldByIdCompQuery, found id: ${inspect(foundId)}`);
        return foundId;
      }));
};

exports.fieldByFormIdName = function fieldByFormIdName(id, name, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching field id by form ${id.logStr}, name: ${name} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchFieldId.byFormIdName('${id.id}', '${name}')`
    )
      .then((foundId) => {
        gIn.tracer.msg3(`fieldByFormIdName, found id: ${inspect(foundId)}`);
        return foundId;
      }));
};

exports.fieldByIdRef = function fieldByIdRef(id, ref, logAction) {
  id = idToIdObj(id);
  return gIn.wrap(
    `Searching field id by container ${id.logStr}, reference: ${ref} ... `,
    logAction,
    () => gT.s.browser.executeScriptWrapper(
      `return tiaEJ.searchFieldId.byIdRef('${id.id}', '${ref}')`
    )
      .then((foundId) => {
        gIn.tracer.msg3(`fieldByIdRef, found id: ${inspect(foundId)}`);
        return foundId;
      }));
};
