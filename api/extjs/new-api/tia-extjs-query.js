'use strict';

// import {gT} from '../../../types';

exports.queryAndAction = async function queryAndAction({
  tEQ,
  action,
  idForLog = null,
  enableLog,
}) {
  // Waiting for all ExtJs inner processes are finished and component is ready to work with.
  // await gT.e.wait.idle(undefined, false);
  await gT.e.wait.ajaxRequestsFinish(undefined, false);

  return gIn.wrap({
    msg: `Searching ExtJs cmp ${idForLog ? (`${idForLog} `) : ''}by TEQ: ${tEQ} ... `,
    enableLog,
    act: async () => gT.s.browser.executeScriptWrapper(
      `const { cmp, cmpInfo } = tiaEJ.searchAndWrap.byTeq('${tEQ}');`
      + `${action};`
    ),
  });
};

exports.queryCmpInfo = async function queryCmpInfo({
  tEQ,
  idForLog,
  enableLog,
}) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo;',
    idForLog,
    enableLog,
  });
};

exports.queryCmpId = async function queryCmpId(
  tEQ,
  idForLog,
  enableLog
) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.realId;',
    idForLog,
    enableLog,
  });
};

exports.queryCmpInputId = async function queryCmpId(
  tEQ,
  idForLog,
  enableLog
) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.inputId;',
    idForLog,
    enableLog,
  });
};
