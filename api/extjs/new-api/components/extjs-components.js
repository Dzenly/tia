'use strict';

/* eslint-disable no-param-reassign */

const _ = require('lodash');

module.exports = {
  checkbox: require('./checkbox'),
  tab: require('./tab'),
  tabPanel: require('./tab-panel'),
};

_.forEach(module.exports, (value) => {
  value.a = value.actions;
  value.c = value.checks;
  value.l = value.logs;
});
