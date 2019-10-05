'use strict';

/* globals gT, gIn */

export function logTitle(enableLog?: boolean) {
  return gIn.wrap('Log title of message box: ', enableLog, () =>
    gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getTitle()').then(title => {
      gIn.logger.log(`"${title}" ... `);
    })
  );
}

export function logMsg(enableLog?: boolean) {
  return gIn.wrap('Log msg of message box: ', enableLog, () =>
    gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getMsg()').then(msg => {
      gIn.logger.log(`"${msg}" ... `, enableLog);
    })
  );
}

export function logContent(enableLog?: boolean) {
  return gIn.wrap('Log content of message box ... ', enableLog, () =>
    gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getContent()').then(content => {
      gIn.logger.log(`\n${gT.commonConsts.content.wrap(`${content}\n`)}`, enableLog);
    })
  );
}

export function getButtonIdByItemId(itemId, enableLog?: boolean) {
  return gIn.wrap(`Get message box button id for itemId: ${itemId} ... `, enableLog, () =>
    gT.s.browser.executeScriptWrapper(`return tiaEJ.msgBox.getButtonIdByItemId('${itemId}')`)
  );
}
