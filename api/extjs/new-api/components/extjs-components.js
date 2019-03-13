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
  table: require('./tableview'),
  tabpanel: require('./tabpanel'),
  textfield: require('./textfield'),
  tree: require('./treeview'),
};

const inheritance = [
  // ['tree', 'table'],
];

inheritance.forEach((item) => {
  _.defaultsDeep(module.exports[item[0]], module.exports[item[1]]);
});

_.forEach(module.exports, (value) => {
  value.a = value.actions;
  value.c = value.checks;
  value.l = value.logs;
});
