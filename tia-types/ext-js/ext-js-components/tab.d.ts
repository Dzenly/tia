// import {
//   ElementIdForLog, EnableLog, Teq
// } from '../common';
import { ComponentActions, ComponentChecks, ComponentLogs } from './component';

/**
 * gT.eC.tab.actions or gT.eC.tab.a
 */
interface TabActions extends ComponentActions {}

/**
 * gT.eC.tab.checks or gT.eC.tab.c
 */
interface TabChecks extends ComponentChecks {}

/**
 * gT.eC.tab.logs or gT.eC.tab.l
 */
interface TabLogs extends ComponentLogs {}

/**
 * gT.eC.tab
 */
export interface Tab {
  actions: TabActions;
  /**
   * alias for actions.
   */
  a: TabActions;
  checks: TabChecks;
  /**
   * alias for checks.
   */
  c: TabChecks;
  logs: TabLogs;
  /**
   * alias for logs.
   */
  l: TabLogs;
}
