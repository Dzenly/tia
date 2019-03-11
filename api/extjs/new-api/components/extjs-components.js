'use strict';

/* eslint-disable no-param-reassign */

const _ = require('lodash');

module.exports = {
  any: require('./any'),
  boundlist: require('./boundlist'),
  button: require('./button'),
  checkbox: require('./checkbox'),
  combobox: require('./combobox'),
  gridcolumn: require('./gridcolumn'),
  tab: require('./tab'),
  table: require('./table'),
  tabpanel: require('./tabpanel'),
  textfield: require('./textfield'),
  tree: require('./tree'),
};

const inheritance = [
  ['tree', 'table'],
];

inheritance.forEach((item) => {
  _.defaultsDeep(module.exports[item[0]], module.exports[item[1]]);
});

_.forEach(module.exports, (value) => {
  value.a = value.actions;
  value.c = value.checks;
  value.l = value.logs;
});
