'use strict';

/* eslint-disable no-param-reassign */

const _ = require('lodash');

module.exports = {
  any: require('./any'),
  button: require('./button'),
  checkbox: require('./checkbox'),
  combobox: require('./combobox'),
  tab: require('./tab'),
  table: require('./table'),
  tabpanel: require('./tabpanel'),
  textfield: require('./textfield'),
};

_.forEach(module.exports, (value) => {
  value.a = value.actions;
  value.c = value.checks;
  value.l = value.logs;
});
