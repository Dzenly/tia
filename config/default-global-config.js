'use strict';

module.exports = {

  // Sometimes root project dir base name is different on different developers machines.
  // To unify project name in logs you can use this option.
  // rootDirAlias: 'rootDirAlias',

  // The URL for remote web driver.
  remoteDriverUrl: 'http://localhost',

  // The Port for remote web driver.
  remoteDriverPort: 9515,

  dummyOptionForTests: 'dummyOptionForTests',

  ejSelectors: {
    tableGroupTitleClass: 'x-grid-group-title',
    closeItemClass: 'x-tagfield-item-close',
  },
};
