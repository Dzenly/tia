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

exports.queryCmpInput = async function queryCmpInput(
  tEQ,
  idForLog,
  enableLog
) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.inputEl;',
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

exports.queryCmpTrigger = async function queryCmpTrigger(
  tEQ,
  idForLog,
  enableLog
) {
  return exports.queryAndAction({
    tEQ,
    action: 'return cmpInfo.constProps.triggerEl;',
    idForLog,
    enableLog,
  });
};

exports.setFakeId = async function setFakeId(
  tEQ,
  fakeId,
  enableLog
) {
  return gIn.wrap({
    msg: `Setting fakeId "${fakeId}" for TEQ: ${tEQ} ... `,
    enableLog,
    act: async () => exports.queryAndAction({
      tEQ,
      action: `tiaEJ.idMap.add('${fakeId}', cmpInfo.constProps.realId);`,
      enableLog: false,
    }),
  });
};

exports.removeAllFakeIds = async function removeAllFakeIds(
  enableLog
) {
  return gIn.wrap({
    msg: 'Removing fake Ids ... ',
    enableLog,
    act: async () => gT.s.browser.executeScriptWrapper('tiaEJ.idMap.removeAll()'),
  });
};

exports.wrap = async function wrap({
  tEQ,
  compName,
  idForLog = '',
  act,
  actionDesc,
  enableLog,
}) {
  return gIn.wrap({
    msg: `${compName}${idForLog ? ` ${idForLog}` : ''} "${tEQ}": ${actionDesc} ... `,
    enableLog,
    act,
  });
};
