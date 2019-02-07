'use strict';

const query = require('./tia-extjs-query');
const components = require('./components/extjs-components');
const queryFromParent = require('../extjs-query-from-parent.js');

gT_.eC = components;

gT_.e.query = query;
gT_.e.q = query;

// gT_.e.query.search = require('./new-api/selenium-search');
// gT_.e.query.actions = require('./new-api/selenium-actions');

gT_.e.queryFromParent = queryFromParent;
gT_.e.qp = queryFromParent;

