

// TODO: вытащить в components.

import { EnableLog } from '../common-types';

export function logTitle(enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Log title of message box: ',
    enableLog,
    act: () =>
      gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getTitle()').then(title => {
        gIn.logger.log(`"${title}" ... `);
      }),
  });
}

export function logMsg(enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Log msg of message box: ',
    enableLog,
    act: () =>
      gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getMsg()').then(msg => {
        gIn.logger.log(`"${msg}" ... `, enableLog);
      }),
  });
}

export function logContent(enableLog?: EnableLog) {
  return gIn.wrap({
    msg: 'Log content of message box ... ',
    enableLog,
    act: () =>
      gT.s.browser.executeScriptWrapper('return tiaEJ.msgBox.getContent()').then(content => {
        gIn.logger.log(`\n${gT.commonConsts.content.wrap(`${content}\n`)}`, enableLog);
      }),
  });
}

export function getButtonIdByItemId(itemId: string, enableLog?: EnableLog) {
  return gIn.wrap({
    msg: `Get message box button id for itemId: ${itemId} ... `,
    enableLog,
    act: () =>
      gT.s.browser.executeScriptWrapper(`return tiaEJ.msgBox.getButtonIdByItemId('${itemId}')`),
  });
}
