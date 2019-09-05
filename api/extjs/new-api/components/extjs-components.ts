'use strict';

/* eslint-disable no-param-reassign */

const _ = require('lodash');

module.exports = {
  component: require('./component'),
  formFieldBase: require('./form-field-base'),
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
  ['formFieldBase', 'component'],
  ['boundlist', 'component'],
  ['button', 'component'],
  ['checkbox', 'formFieldBase'],
  ['combobox', 'formFieldBase'],
  ['form', 'component'],
  ['gridcolumn', 'component'],
  ['tab', 'component'],
  ['tableview', 'component'],
  ['tabpanel', 'component'],
  ['textfield', 'formFieldBase'],
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
