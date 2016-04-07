'use strict';

/* globals gIn: true */

/*
 Utilities for tests.
 */

/**
 * Sets the test title.
 * @param title
 */
exports.setTitle = function (title) {
  gIn.tInfo.data.title = title; // From global sandbox.
  gIn.logger.logln(title);
  gIn.logger.logln('=================');
};
