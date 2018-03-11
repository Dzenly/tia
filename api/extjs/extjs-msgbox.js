'use strict';

/* globals gT, gIn */

exports.logTitle = function logTitle(logAction) {
  return gIn.wrap(
    'Log title of message box: ',
    logAction, () => gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getTitle()')
      .then((title) => {
        gIn.logger.log(`"${title}" ... `);
      }));
};

exports.logMsg = function logMsg(logAction) {
  return gIn.wrap(
    'Log msg of message box: ',
    logAction, () => gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getMsg()')
      .then((msg) => {
        gIn.logger.log(`"${msg}" ... `, logAction);
      }));
};

exports.logContent = function logContent(logAction) {
  return gIn.wrap(
    'Log content of message box ... ',
    logAction, () => gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getContent()')
      .then((content) => {
        gIn.logger.log(`\n${gT.commonConsts.content.wrap(`${content}\n`)}`, logAction);
      }));
};

exports.getButtonIdByItemId = function getButtonIdByItemId(itemId, logAction) {
  return gIn.wrap(
    `Get message box button id for itemId: ${itemId} ... `,
    logAction, () => gT.s.browser.executeScriptWrapper(`return tiaEJ.msgBox.getButtonIdByItemId('${itemId}')`));
};
