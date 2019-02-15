'use strict';

/* globals gT, gIn */

exports.logTitle = function logTitle(enableLog) {
  return gIn.wrap(
    'Log title of message box: ',
    enableLog,
    () => gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getTitle()')
      .then((title) => {
        gIn.logger.log(`"${title}" ... `);
      }));
};

exports.logMsg = function logMsg(enableLog) {
  return gIn.wrap(
    'Log msg of message box: ',
    enableLog,
    () => gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getMsg()')
      .then((msg) => {
        gIn.logger.log(`"${msg}" ... `, enableLog);
      }));
};

exports.logContent = function logContent(enableLog) {
  return gIn.wrap(
    'Log content of message box ... ',
    enableLog,
    () => gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getContent()')
      .then((content) => {
        gIn.logger.log(`\n${gT.commonConsts.content.wrap(`${content}\n`)}`, enableLog);
      }));
};

exports.getButtonIdByItemId = function getButtonIdByItemId(itemId, enableLog) {
  return gIn.wrap(
    `Get message box button id for itemId: ${itemId} ... `,
    enableLog, () => gT.s.browser.executeScriptWrapper(`return tiaEJ.msgBox.getButtonIdByItemId('${itemId}')`));
};
