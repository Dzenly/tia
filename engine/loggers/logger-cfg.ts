'use strict';

/* globals gT: true */

export const consoleLogPrefix = ''; // LOG:
export const errPrefix = 'ERR: ';
export const excPrefix = 'EXC: ';
export const indentation = '| ';

// TODO: Check that engineConsts already added to gT.
export let defLLLogAction: boolean | null = null;

export function setDefLLLogAction(enable: boolean) {
  defLLLogAction = enable;
}

export function getDefLLLogAction() {
  if (defLLLogAction === null) {
    return gT.engineConsts.defLLLogAction;
  }
  return defLLLogAction;
}

// export const firstIndent = '|-'
