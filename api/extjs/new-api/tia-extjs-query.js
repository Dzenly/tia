'use strict';

exports.queryAndAction = async function queryAndAction({
  tEQ,
  action,
  elNameForLog = null,
  logAction,
}) {
  // Waiting for all ExtJs inner processes are finished and component is ready to work with.
  await gT.e.wait.idle(undefined, false);

  return gIn.wrap({
    msg: `Searching ExtJs cmp ${elNameForLog ? (`${elNameForLog} `) : ''}by TEQ: ${tEQ} ... `,
    logAction,
    act: async () => gT.s.browser.executeScriptWrapper(
      `const { cmp, cmpInfo } = tiaEJ.searchAndWrap.byTeq('${tEQ}');`
      + `${action};`
    ),
  });
};

exports.queryCmpInfo = async function queryCmpInfo({
  tEQ,
  elNameForLog,
  logAction,
}) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo;',
    elNameForLog,
    logAction,
  });
};

exports.queryCmpId = async function queryCmpId({
  tEQ,
  elNameForLog,
  logAction,
}) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.realId;',
    elNameForLog,
    logAction,
  });
};
