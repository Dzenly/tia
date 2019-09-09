'use strict';

/* eslint-disable no-param-reassign */

// import * as _ from 'lodash';

import * as component from './component';
import * as formFieldBase from './form-field-base';
import * as boundlist from './boundlist';
import * as button from './button';
import * as checkbox from './checkbox';
import * as combobox from './combobox';
import * as form from './form';
import * as gridcolumn from './gridcolumn';
import * as tab from './tab';
import * as tableview from './tableview';
import * as tabpanel from './tabpanel';
import * as textfield from './textfield';
import * as treeview from './treeview';

const ejApi = {
  component: {
    a: component.ComponentActions,
    actions: component.ComponentActions,
    c: component.ComponentChecks,
    checks: component.ComponentChecks,
    l: component.ComponentLogs,
    logs: component.ComponentLogs,
  },
  formFieldBase: {
    a: formFieldBase.FormFieldBaseActions,
    actions: formFieldBase.FormFieldBaseActions,
    c: formFieldBase.FormFieldBaseChecks,
    checks: formFieldBase.FormFieldBaseChecks,
    l: formFieldBase.FormFieldBaseLogs,
    logs: formFieldBase.FormFieldBaseLogs,
  },
  boundlist: {
    a: boundlist.BoundListActions,
    actions: boundlist.BoundListActions,
    c: boundlist.BoundListChecks,
    checks: boundlist.BoundListChecks,
    l: boundlist.BoundListLogs,
    logs: boundlist.BoundListLogs,
  },
  button: {
    a: button.ButtonActions,
    actions: button.ButtonActions,
    c: button.ButtonChecks,
    checks: button.ButtonChecks,
    l: button.ButtonLogs,
    logs: button.ButtonLogs,
  },
  checkbox: {
    a: checkbox.CheckBoxActions,
    actions: checkbox.CheckBoxActions,
    c: checkbox.CheckBoxChecks,
    checks: checkbox.CheckBoxChecks,
    l: checkbox.CheckBoxLogs,
    logs: checkbox.CheckBoxLogs,
  },
  combobox: {
    a: combobox.ComboBoxActions,
    actions: combobox.ComboBoxActions,
    c: combobox.ComboBoxChecks,
    checks: combobox.ComboBoxChecks,
    l: combobox.ComboBoxLogs,
    logs: combobox.ComboBoxLogs,
  },
  form: {
    a: form.FormActions,
    actions: form.FormActions,
    c: form.FormChecks,
    checks: form.FormChecks,
    l: form.FormLogs,
    logs: form.FormLogs,
  },
  gridcolumn: {
    a: gridcolumn.GridColumnActions,
    actions: gridcolumn.GridColumnActions,
    c: gridcolumn.GridColumnChecks,
    checks: gridcolumn.GridColumnChecks,
    l: gridcolumn.GridColumnLogs,
    logs: gridcolumn.GridColumnLogs,
  },
  tab: {
    a: tab.TabActions,
    actions: tab.TabActions,
    c: tab.TabChecks,
    checks: tab.TabChecks,
    l: tab.TabLogs,
    logs: tab.TabLogs,
  },
  tableview: {
    a: tableview.TableViewActions,
    actions: tableview.TableViewActions,
    c: tableview.TableViewChecks,
    checks: tableview.TableViewChecks,
    l: tableview.TableViewLogs,
    logs: tableview.TableViewLogs,
  },
  tabpanel: {
    a: tabpanel.TabPanelActions,
    actions: tabpanel.TabPanelActions,
    c: tabpanel.TabPanelChecks,
    checks: tabpanel.TabPanelChecks,
    l: tabpanel.TabPanelLogs,
    logs: tabpanel.TabPanelLogs,
  },
  textfield: {
    a: textfield.TextFieldActions,
    actions: textfield.TextFieldActions,
    c: textfield.TextFieldChecks,
    checks: textfield.TextFieldChecks,
    l: textfield.TextFieldLogs,
    logs: textfield.TextFieldLogs,
  },
  treeview: {
    a: treeview.TreeViewActions,
    actions: treeview.TreeViewActions,
    c: treeview.TreeViewChecks,
    checks: treeview.TreeViewChecks,
    l: treeview.TreeViewLogs,
    logs: treeview.TreeViewLogs,
  },
};

export default ejApi;

// const entries = Object.entries(module.exports);
//
// for (const [xtype, obj] of entries) {
//   if (xtype !== 'component') {
//     _.defaultsDeep(module.exports[item[0]], module.exports[item[1]]);
//   }
// }

// const inheritance = [
//   ['formFieldBase', 'component'],
//   ['boundlist', 'component'],
//   ['button', 'component'],
//   ['checkbox', 'formFieldBase'],
//   ['combobox', 'formFieldBase'],
//   ['form', 'component'],
//   ['gridcolumn', 'component'],
//   ['tab', 'component'],
//   ['tableview', 'component'],
//   ['tabpanel', 'component'],
//   ['textfield', 'formFieldBase'],
//   ['treeview', 'tableview'],
// ];
//
// inheritance.forEach((item) => {
//   _.defaultsDeep(module.exports[item[0]], module.exports[item[1]]);
// });
//
// _.forEach(module.exports, (value) => {
//   value.a = value.actions;
//   value.c = value.checks;
//   value.l = value.logs;
// });
