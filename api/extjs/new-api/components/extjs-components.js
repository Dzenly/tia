'use strict';

/* eslint-disable no-param-reassign */

const _ = require('lodash');

module.exports = {
  component: require('./component'),
  boundlist: require('./boundlist'),
  button: require('./button'),
  checkbox: require('./checkbox'),
  combobox: require('./combobox'),
  form: require('./form'),
  gridcolumn: require('./gridcolumn'),
  tab: require('./tab'),
  tableview: require('./tableview'),
  tabpanel: require('./tabpanel'),
  textfield: require('./textfield'),
  treeview: require('./treeview'),
};

// const entries = Object.entries(module.exports);
//
// for (const [xtype, obj] of entries) {
//   if (xtype !== 'component') {
//     _.defaultsDeep(module.exports[item[0]], module.exports[item[1]]);
//   }
// }

const inheritance = [
  ['boundlist', 'component'],
  ['button', 'component'],
  ['checkbox', 'component'],
  ['combobox', 'component'],
  ['form', 'component'],
  ['gridcolumn', 'component'],
  ['tab', 'component'],
  ['tableview', 'component'],
  ['tabpanel', 'component'],
  ['textfield', 'component'],
  ['treeview', 'tableview'],
];

inheritance.forEach((item) => {
  _.defaultsDeep(module.exports[item[0]], module.exports[item[1]]);
});

_.forEach(module.exports, (value) => {
  value.a = value.actions;
  value.c = value.checks;
  value.l = value.logs;
});
