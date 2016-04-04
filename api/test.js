'use strict';

/* globals gT: true */

/*
 Utilities for tests.
 */

/**
 * Sets the test title.
 * @param title
 */
gT.t.setTitle = function (title) {
  gT.tInfo.data.title = title; // From global sandbox.
  gT.logger.logln(title);
  gT.logger.logln('=================');
};
