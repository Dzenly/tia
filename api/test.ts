'use strict';

/* globals gIn: true */

/*
 Utilities for tests.
 */

/**
 * Sets the test title.
 * @param title
 */
export function setTitle(title: string) {
  gIn.tInfo.setTitle(title); // TODO: From global sandbox.
  gIn.logger.logln('=================');
  gIn.logger.logBold(`Title: ${title}\n`);
}
