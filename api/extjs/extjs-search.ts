'use strict';

const { inspect } = require('util');

export function byIdRef(id, ref, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Searching id by container ${id.logStr}, reference: ${ref} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchId.byIdRef('${id.id}', '${ref}')`)
      .then(foundId => {
        gIn.tracer.msg3(`byIdRef, found id: ${foundId}`);
        return foundId;
      })
  );
}

// ============================

export function byIdCompQuery(id, compQuery, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Searching id by container ${id.logStr}, compQuery: ${compQuery} ... `,
    enableLog,
    () =>
      gT.s.browser
        .executeScriptWrapper(`return tiaEJ.searchId.byIdCompQuery('${id.id}', '${compQuery}')`)
        .then(foundId => {
          gIn.tracer.msg3(`byIdCompQuery, found id: ${foundId}`);
          return foundId;
        })
  );
}

export function byFormIdName(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Searching id by form ${id.logStr}, name: ${name} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchId.byFormIdName('${id.id}', '${name}')`)
      .then(foundId => {
        gIn.tracer.msg3(`byFormIdName, found id: ${foundId}`);
        return foundId;
      })
  );
}

export function inputByIdCompQuery(id, compQuery, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Searching input id by container ${id.logStr}, compQuery: ${compQuery} ... `,
    enableLog,
    () =>
      gT.s.browser
        .executeScriptWrapper(
          `return tiaEJ.searchInputId.byIdCompQuery('${id.id}', '${compQuery}')`
        )
        .then(foundId => {
          gIn.tracer.msg3(`inputByIdCompQuery, found id: ${inspect(foundId)}`);
          return foundId;
        })
  );
}

export function inputByFormIdName(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Searching input id by form ${id.logStr}, name: ${name} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchInputId.byFormIdName('${id.id}', '${name}')`)
      .then(foundId => {
        gIn.tracer.msg3(`inputByFormIdName, found id: ${inspect(foundId)}`);
        return foundId;
      })
  );
}

export function inputByIdRef(id, ref, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Searching input id by container ${id.logStr}, reference: ${ref} ... `,
    enableLog,
    () =>
      gT.s.browser
        .executeScriptWrapper(`return tiaEJ.searchInputId.byIdRef('${id.id}', '${ref}')`)
        .then(foundId => {
          gIn.tracer.msg3(`inputByIdRef, found id: ${inspect(foundId)}`);
          return foundId;
        })
  );
}

export function fieldByIdCompQuery(id, compQuery, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Searching field id by container ${id.logStr}, compQuery: ${compQuery} ... `,
    enableLog,
    () =>
      gT.s.browser
        .executeScriptWrapper(
          `return tiaEJ.searchFieldId.byIdCompQuery('${id.id}', '${compQuery}')`
        )
        .then(foundId => {
          gIn.tracer.msg3(`fieldByIdCompQuery, found id: ${inspect(foundId)}`);
          return foundId;
        })
  );
}

export function fieldByFormIdName(id, name, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(`Searching field id by form ${id.logStr}, name: ${name} ... `, enableLog, () =>
    gT.s.browser
      .executeScriptWrapper(`return tiaEJ.searchFieldId.byFormIdName('${id.id}', '${name}')`)
      .then(foundId => {
        gIn.tracer.msg3(`fieldByFormIdName, found id: ${inspect(foundId)}`);
        return foundId;
      })
  );
}

export function fieldByIdRef(id, ref, enableLog) {
  id = gT.s.idToIdObj(id);
  return gIn.wrap(
    `Searching field id by container ${id.logStr}, reference: ${ref} ... `,
    enableLog,
    () =>
      gT.s.browser
        .executeScriptWrapper(`return tiaEJ.searchFieldId.byIdRef('${id.id}', '${ref}')`)
        .then(foundId => {
          gIn.tracer.msg3(`fieldByIdRef, found id: ${inspect(foundId)}`);
          return foundId;
        })
  );
}
